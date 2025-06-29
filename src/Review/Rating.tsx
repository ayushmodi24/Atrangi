// import * as React from 'react';
// import Rating from '@mui/material/Rating';
// import Box from '@mui/material/Box';
// import StarIcon from '@mui/icons-material/Star';

// const labels: { [index: string]: string } = {
//   0.5: 'Useless',
//   1: 'Useless+',
//   1.5: 'Poor',
//   2: 'Poor+',
//   2.5: 'Ok',
//   3: 'Ok+',
//   3.5: 'Good',
//   4: 'Good+',
//   4.5: 'Excellent',
//   5: 'Excellent+',
// };

// function getLabelText(value: number) {
//   return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
// }

// export default function HoverRating() {
//   const [value, setValue] = React.useState<number | null>(2);
//   const [hover, setHover] = React.useState(-1);

//   return (
//     <Box  sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
//       <Rating
//       className='ml-150'
//         name="hover-feedback"
//         value={value}
//         precision={0.5}
//         getLabelText={getLabelText}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         onChangeActive={(event, newHover) => {
//           setHover(newHover);
//         }}
//         emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
//       />
//       {value !== null && (
//         <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
//       )}
//     </Box>
//   );
// }


import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: number]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

interface HoverRatingProps {
  rating: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
}

export default function HoverRating({ rating, onChange, readOnly = false }: HoverRatingProps) {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box sx={{ width: 200, display: 'flex', alignItems: 'center' }}>
      <Rating
        name="hover-feedback"
        value={rating}
        className='text-center ml-100'
        precision={0.5}
        getLabelText={getLabelText}
        //@ts-ignore
        onChange={(event, newValue) => {
          if (!readOnly && newValue !== null && onChange) {
            onChange(newValue);
          }
        }}
//@ts-ignore
        onChangeActive={(event, newHover) => {
          if (!readOnly) setHover(newHover);
        }}
        readOnly={readOnly}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {rating !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : rating]}</Box>
      )}
    </Box>
  );
}
