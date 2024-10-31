import { Star } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StarsProps {
  onRatingChange: (n: number) => void;
  initialRating?: number; // Optional prop for initial rating
}

export const Stars2 = ({  onRatingChange, initialRating = 4 }: StarsProps) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (idx: number) => {
    const newRating = idx ;
    setRating(newRating);
    onRatingChange(newRating);
  };

  useEffect(() => {
    setRating(initialRating); // Update rating if initialRating changes
  }, [initialRating]);

  return (
    <div className="flex mb-2" role="group" aria-labelledby="rating">
      <label htmlFor="rating" className="mr-2" id="rating">Rating</label>
      <div className="flex items-center">
        {[...Array(5)].map((_, idx) => (
          <Star
            key={`star-${idx}`}
            onClick={() => handleClick(idx+1)}
            size={15}
            fill={idx<rating?'yellow':'white'}
            color={idx < rating ? 'yellow' : 'black'}
            role="button"
            tabIndex={0}
          />
        ))}
      </div>
    </div>
  );
};
