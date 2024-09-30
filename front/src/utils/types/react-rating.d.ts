declare module 'react-rating' {
    import * as React from 'react';
  
    interface RatingProps {
      readonly emptySymbol?: React.ReactNode | string | Array<React.ReactNode | string>;
      readonly fullSymbol?: React.ReactNode | string | Array<React.ReactNode | string>;
      readonly placeholderSymbol?: React.ReactNode | string | Array<React.ReactNode | string>;
      readonly initialRating?: number;
      readonly readonly?: boolean;
      readonly onClick?: (rate: number, event: React.MouseEvent) => void;
      readonly onHover?: (rate: number) => void;
      readonly stop?: number;
      readonly step?: number;
      readonly fractions?: number;
    }
  
    class Rating extends React.Component<RatingProps> {}
  
    export default Rating;
  }