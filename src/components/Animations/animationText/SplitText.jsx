import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

const SplitText = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
}) => {
  const ref = useRef(null);
  const animationRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  // Set isReady to true once component mounts
  useEffect(() => {
    setIsReady(true);
    return () => {
      // Clean up any animations when component unmounts
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  // Run animation only once when component is ready
  useEffect(() => {
    if (!isReady || typeof window === "undefined" || !ref.current || !text) return;

    const el = ref.current;
    
    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    let splitter;
    try {
      splitter = new GSAPSplitText(el, {
        type: splitType,
        absolute: absoluteLines,
        linesClass: "split-line",
      });
    } catch (error) {
      console.error("Failed to create SplitText:", error);
      return;
    }

    let targets;
    switch (splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "chars":
        targets = splitter.chars;
        break;
      default:
        targets = splitter.chars;
    }

    // Add text-transparent to each split element
    if (targets && targets.length > 0) {
      // Make sure each character is visible
      targets.forEach((t) => {
        // Remove any styles that might make text invisible
        t.style.color = "";
        t.style.webkitTextFillColor = "";
        t.style.opacity = "";
        t.style.display = "inline-block";
      });
    }

    if (!targets || targets.length === 0) {
      console.warn("No targets found for SplitText animation");
      splitter.revert();
      return;
    }

    targets.forEach((t) => {
      t.style.willChange = "transform, opacity";
    });

    // Force animation to play immediately
    const tl = gsap.timeline({
      delay: 0.1,
      smoothChildTiming: true,
      onComplete: () => {
        gsap.set(targets, {
          ...to,
          clearProps: "willChange",
          immediateRender: true,
        });
        onLetterAnimationComplete?.();
      },
    });

    // Store animation reference
    animationRef.current = tl;

    // Set initial state
    tl.set(targets, { ...from, immediateRender: false, force3D: true });
    
    // Animate to final state
    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      if (tl) {
        tl.kill();
      }
      gsap.killTweensOf(targets);
      if (splitter) {
        splitter.revert();
      }
    };
  }, [isReady]); // Only depend on isReady, so animation runs exactly once

  return (
    <p
      ref={ref}
      className={`split-parent overflow-hidden inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
