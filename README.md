# README for React Animation Components

## Overview

This package provides a set of React components designed to enable smooth and customizable animations for web elements during scrolling and other interactions. Leveraging `framer-motion` for fluid animations, these components are highly adaptable for various use cases.

## Components

### `TriggerOnScroll`

Animates elements based on scroll position.

#### Props

- **`stiffness`, `damping`, `restDelta`**: Spring animation configuration.
- **`offset`**: Defines the scroll range for triggering the animation.
- **`shouldAnimateOpacity`, `shouldAnimateScaleX`, etc.**: Boolean props to enable specific animations.
- **`offSetOutputRange`, `transformOutputRange`, `bgColorOutputRange`**: Define the output range for the respective animations.

### `ScrollOnView`

Fades and translates elements into view on scroll.

#### Props

- **`transitionDelayVelocity`, `transitionLength`, `transitionTiming`, `transitionDelay`**: Control the transition timing and delay.
- **`useInViewOnce`**: Boolean to determine if the animation should only play once.
- **`indexOffset`**: Adjusts the delay based on the element's index.

### `AnimateAllChildren`

Applies `ScrollOnView` or `TriggerOnScroll` animations to all child elements.

#### Props

- Inherits all props from `TriggerOnScroll` and `ScrollOnView`.
- **`scrollOnView`**: Determines which animation type to use.
- **`indexOffset`**: Adjusts the index offset for staggered animations.

### `TraverseAndAnimate`

Recursively applies `ScrollOnView` to nested child elements.

#### Props

- **`transitionDelayVelocity`, `transitionLength`, `transitionTiming`, `transitionDelay`**: Control the transition timing and delay.
- **`useInViewOnce`**: Determines if the animation should only play once.

## Installation

```bash
yarn add easy-chakra-animate
```

## Usage

```jsx
import { TriggerOnScroll, ScrollOnView, AnimateAllChildren, TraverseAndAnimate } from 'easy-chakra-animate';

// Example usage
<AnimateAllChildren>
  {list.map((componentData) => (
    <DynamicComponent key={componentData.id} componentData={componentData} />
  ))}
</AnimateAllChildren>
```

## Demo

See these components in action [here](https://643c599e10255e45ba42fdae-celzvjwdvb.chromatic.com/?path=/story/animations-onscroll--default).

## Dependencies

- React
- Framer Motion

## Contributing

Contributions are welcome. Please submit a pull request or an issue for any feature requests or bugs.

## License

This project is licensed under the MIT License. See the LICENSE file for details.