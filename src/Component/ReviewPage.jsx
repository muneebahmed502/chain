import React,{useState,useEffect}from 'react';
import Slider from 'react-slick';
import { Box, Typography,Button,TextField,Rating} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { postReview,getAllReviews} from '../Config/firebase';


// const dummyReviews = [
//   { name: 'Ayesha', review: 'Fragrance is so good, everyone asks me about it.', date: 'January 18, 2021' },
//   { name: 'Hassan', review: 'Highly recommend for long-lasting scent.', date: 'January 18, 2021' },
//   { name: 'Maria', review: 'The best perfume I have ever used!', date: 'January 18, 2021' },
//   { name: 'Bilal', review: 'Smells great and stays on all day.', date: 'January 18, 2021' },
//   { name: 'Anam', review: 'Elegant and classy scent, just love it!', date: 'January 18, 2021' },
// ];

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [addreview, setAddReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
const [loading, setLoading] = useState(true);

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2, // Adjust to 1 for a single vertical layout
  slidesToScroll: 1,
  // vertical: true, // Enable vertical scrolling
  // verticalSwiping: true, // Enable swiping vertically
  responsive: [
    {
      breakpoint: 708,
      settings: {
        slidesToShow: 1,
        // vertical: true, // Ensure vertical layout remains
      },
    },
  ],
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

  // Custom navigation arrows
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: '#000', borderRadius: '50%' }}
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: 'block', background: '#000', borderRadius: '50%' }}
        onClick={onClick}
      />
    );
  }

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getAllReviews();
        setReviews(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);


  const handleSubmit = async () => {
    if (!addreview || !name || !email || rating === 0) {
      alert('Please fill all fields!');
      return;
    }
    const newReview = {
      name,
      addreview,
      email,
      rating,
      date: new Date().toLocaleDateString(),
      createdAt: new Date(),
    };
    try {
      await postReview(newReview);
      addreview('');
      setName('');
      setEmail('');
      setRating(0);
      setReviews((prevReviews) => [newReview, ...prevReviews]); // Update state immediately
    } catch (error) {
      console.error(error.message);
    }
  };


  return (
    <>
    <Box sx={{mr:5}} mt={4}>
    {loading ? (
          <Typography>Loading reviews...</Typography>
        ) : reviews.length === 0 ? (
          <Typography>No reviews added yet.</Typography>
        ) : (
      <Slider {...settings}>
        {reviews.map((review, index) => (
          <Box
            key={index}
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              p: 3,
              ml: 1,
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              {review.name}
            </Typography>
            <Typography variant="body1" sx={{ color: '#616161', mb: 2 }}>
              {review.addreview}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      sx={{
                        color: i < review.rating ? '#FFD700' : '#e0e0e0',
                        fontSize: '18px',
                      }}
                      />
                    ))}
            </Box>
            <Typography variant="caption" sx={{ mt: 1, color: '#9e9e9e' }}>
              {review.date}
            </Typography>
          </Box>
        ))}
      </Slider>
        )}
    </Box>

    <Box sx={{mt:10,ml:{md:10,xs:2}}}>
    <Typography variant="h5" gutterBottom>
        Add a Review
      </Typography>

      <Box sx={{ my: 2 }}>
        <Typography variant="body1">Your Rating *</Typography>
        <Rating
          name="simple-controlled"
          value={rating}
          onChange={(event, newValue) => setRating(newValue)}
        />
      </Box>

      <TextField
        label="Your Review"
        multiline
        rows={4}    
        required
        value={addreview}
        onChange={(e) => setAddReview(e.target.value)}
        sx={{ mb: 3,width:{md:'40%',xs:"90%"}}}
      />
      <br />
         <TextField
        label="Your Full Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mb: 3,width:{md:'40%',xs:"90%"}}}
      />
      <br />
         <TextField
        label="Your Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3,width:{md:'40%',xs:"90%"}}}
      />
      <br />
      <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ bgcolor: 'black', color: 'white', '&:hover': { bgcolor: 'gray' } }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
    </Box>

    </>
  );
};

export default ReviewPage;
