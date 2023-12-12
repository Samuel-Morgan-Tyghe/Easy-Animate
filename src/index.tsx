import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import React, { Children, ReactNode, cloneElement, useRef } from "react";

type ScrollOnViewProps = {
  children?: ReactNode;
  index?: number;
  transitionDelayVelocity?: number;
  transitionLength?: number;
  transitionTiming?: string;
  transitionDelay?: number;
  useInViewOnce?: boolean;
  indexOffset?: number;
  withProps?: boolean;
};

interface TriggerOnScrollProps {
  children?: ReactNode;
  withProps?: boolean;
  index?: number;
  stiffness?: number;
  damping?: number;
  restDelta?: number;
  transitionLength?: number;
  transitionTiming?: string;
  transitionDelay?: number;
  offset?: any;
  shouldAnimateOpacity?: boolean;
  shouldAnimateScaleX?: boolean;
  shouldAnimateScaleY?: boolean;
  shouldAnimateWidth?: boolean;
  shouldAnimateHeight?: boolean;
  shouldAnimateTranslateX?: boolean;
  shouldAnimateTranslateY?: boolean;
  shouldAnimateBackgroundColor?: boolean;
  offSetOutputRange?: [string, string];
  transformOutputRange?: [string, string];
  bgColorOutputRange?: [string, string];
}
export function TriggerOnScroll({
  children = <></>,
  withProps = true,
  stiffness = 100,
  damping = 30,
  restDelta = 0.001,

  offset = ["start end", "end end"],
  shouldAnimateOpacity = false,
  shouldAnimateScaleX = false,
  shouldAnimateScaleY = false,
  shouldAnimateWidth = false,
  shouldAnimateHeight = false,
  shouldAnimateTranslateX = false,
  shouldAnimateTranslateY = false,
  shouldAnimateBackgroundColor = false,
  offSetOutputRange = ["100%", "0%"],
  transformOutputRange = ["0%", "100%"],
  bgColorOutputRange = ["#ff0000", "#ffffff"],
  ...additionalProps
}: TriggerOnScrollProps) {
  const ref = useRef(null);
  const props =
    withProps && React.isValidElement(children) ? { ...children.props } : {};

  const { scrollYProgress } = useScroll({ target: ref, offset });
  const animationValue = useSpring(scrollYProgress, {
    stiffness,
    damping,
    restDelta,
  });

  const transformedAnimationValue = useTransform(
    animationValue,
    [0, 1],
    transformOutputRange
  );
  const offSetAnimationValue = useTransform(
    animationValue,
    [0, 1],
    offSetOutputRange
  );
  const bgColor = useTransform(animationValue, [0, 1], bgColorOutputRange);

  return (
    <motion.div
      ref={ref}
      style={{
        opacity: shouldAnimateOpacity ? animationValue : 1,
        scaleX: shouldAnimateScaleX ? animationValue : 1,
        scaleY: shouldAnimateScaleY ? animationValue : 1,
        width: shouldAnimateWidth ? transformedAnimationValue : "auto",
        height: shouldAnimateHeight ? transformedAnimationValue : "auto",
        translateX: shouldAnimateTranslateX ? offSetAnimationValue : 0,
        translateY: shouldAnimateTranslateY ? offSetAnimationValue : 0,
        backgroundColor: shouldAnimateBackgroundColor ? bgColor : "",
        border: "1px solid black",
        borderRadius: "8px",
      }}
      layout
      {...props}
      {...additionalProps}
    >
      {children}
    </motion.div>
  );
}

export function ScrollOnView({
  children = <></>,
  index = 0,
  transitionDelayVelocity = 1,
  transitionLength = 0.9,
  transitionTiming = "cubic-bezier(0.17, 0.55, 0.55, 1)",
  transitionDelay = 0.5,
  useInViewOnce = true,
  indexOffset = 0,
}: ScrollOnViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: useInViewOnce });
  return (
    <div
      ref={ref}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(25px)",
        transition: `all ${transitionLength}s ${transitionTiming} ${transitionDelay}s`,
        transitionDelay: `${
          (index + indexOffset) * 10 * transitionDelayVelocity
        }ms`,
      }}
    >
      {children}
    </div>
  );
}

export function AnimateAllChildren({
  children,
  withProps = true,
  transitionDelayVelocity = 1,
  transitionLength = 0.5,
  transitionTiming = "cubic-bezier(0.17, 0.55, 0.55, 1)",
  transitionDelay = 0.3,
  useInViewOnce = true,
  scrollOnView = true,
  stiffness = 100,
  damping = 30,
  restDelta = 0.001,
  offset = ["start end", "end end"],
  shouldAnimateOpacity = false,
  shouldAnimateScaleX = false,
  shouldAnimateScaleY = false,
  shouldAnimateWidth = false,
  shouldAnimateHeight = false,
  shouldAnimateTranslateX = false,
  shouldAnimateTranslateY = false,
  shouldAnimateBackgroundColor = false,
  offSetOutputRange = ["100%", "0%"],
  transformOutputRange = ["0%", "100%"],
  bgColorOutputRange = ["#ff0000", "#ffffff"],
  indexOffset = 0,
  ...props
}: TriggerOnScrollProps & {
  children: ReactNode;
  scrollOnView?: boolean;
  indexOffset?: number;
  withProps?: boolean;
  index?: number;
  useInViewOnce?: boolean;
  transitionDelayVelocity?: number;
  transitionLength?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) {
    return children;
  }

  const arrayChildren = Children.toArray(children);
  return (
    <>
      {arrayChildren.map((child = <></>, index: number) => (
        <React.Fragment key={index}>
          {scrollOnView ? (
            <ScrollOnView
              index={index}
              transitionDelayVelocity={transitionDelayVelocity}
              withProps={withProps}
              transitionLength={transitionLength}
              transitionTiming={transitionTiming}
              transitionDelay={transitionDelay}
              useInViewOnce={useInViewOnce}
              indexOffset={indexOffset}
              {...props}
            >
              {child}
            </ScrollOnView>
          ) : (
            <TriggerOnScroll
              stiffness={stiffness}
              damping={damping}
              restDelta={restDelta}
              offset={offset}
              withProps={withProps}
              transitionLength={transitionLength}
              transitionTiming={transitionTiming}
              transitionDelay={transitionDelay}
              shouldAnimateOpacity={shouldAnimateOpacity}
              shouldAnimateScaleX={shouldAnimateScaleX}
              shouldAnimateScaleY={shouldAnimateScaleY}
              shouldAnimateWidth={shouldAnimateWidth}
              shouldAnimateHeight={shouldAnimateHeight}
              shouldAnimateTranslateX={shouldAnimateTranslateX}
              shouldAnimateTranslateY={shouldAnimateTranslateY}
              shouldAnimateBackgroundColor={shouldAnimateBackgroundColor}
              offSetOutputRange={offSetOutputRange}
              transformOutputRange={transformOutputRange}
              bgColorOutputRange={bgColorOutputRange}
            >
              {child}
            </TriggerOnScroll>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

export function TraverseAndAnimate({
  children = <></>,
  withProps = true,
  transitionDelayVelocity = 1,
  transitionLength = 0.9,
  transitionTiming = "cubic-bezier(0.17, 0.55, 0.55, 1)",
  transitionDelay = 0.5,
  useInViewOnce = true,
}: {
  children?: ReactNode;
  withProps?: boolean;
  transitionDelayVelocity?: number;
  transitionLength?: number;
  transitionTiming?: string;
  transitionDelay?: number;
  useInViewOnce?: boolean;
}) {
  let index = 0;
  const wrapChildren = (children) => {
    const arrayChildren = Children.toArray(children);
    return arrayChildren.length > 1 ||
      (React.isValidElement(arrayChildren[0]) &&
        arrayChildren[0]?.props?.children?.length > 1) ? (
      arrayChildren.map((child) => {
        index++;
        const innerChild = React.isValidElement(child)
          ? child.props.children
          : null;

        return React.isValidElement(child) ? (
          cloneElement(child, undefined, wrapChildren(innerChild))
        ) : (
          <ScrollOnView
            index={index}
            transitionDelayVelocity={transitionDelayVelocity}
            withProps={withProps}
            transitionLength={transitionLength}
            transitionTiming={transitionTiming}
            transitionDelay={transitionDelay}
            useInViewOnce={useInViewOnce}
          >
            {child}
          </ScrollOnView>
        );
      })
    ) : (
      <ScrollOnView
        index={index}
        transitionDelayVelocity={transitionDelayVelocity}
        withProps={withProps}
        transitionLength={transitionLength}
        transitionTiming={transitionTiming}
        transitionDelay={transitionDelay}
        useInViewOnce={useInViewOnce}
      >
        {children}
      </ScrollOnView>
    );
  };

  return <>{wrapChildren(children)}</>;
}
