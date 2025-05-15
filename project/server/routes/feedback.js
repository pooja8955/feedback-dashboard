import express from 'express';
import Feedback from '../models/Feedback.js';
import Sentiment from 'sentiment';
const sentiment = new Sentiment();


const router = express.Router();

// GET all feedback with enhanced error handling
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    console.log(`Successfully fetched ${feedback.length} feedback items`);
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ 
      message: 'Failed to fetch feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET feedback by ID
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json(feedback);
  } catch (error) {
    console.error('Error fetching feedback by ID:', error);
    res.status(500).json({ 
      message: 'Failed to fetch feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST new feedback
router.post('/', async (req, res) => {
  try {
    // Analyze sentiment of the feedback text
    const result = sentiment.analyze(req.body.description);  // assuming feedback text is in req.body.text

    // Add sentiment score to the feedback data
    req.body.sentimentScore = result.score;

    // Create new Feedback with sentimentScore included
    const newFeedback = new Feedback(req.body);

    // Save feedback
    const savedFeedback = await newFeedback.save();

    console.log('Successfully created new feedback:', savedFeedback._id);

    // Send response
    res.status(201).json(savedFeedback);

  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(400).json({ 
      message: 'Failed to create feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


// PATCH update feedback
router.patch('/:id', async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true }
    );
    if (!updatedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    console.log('Successfully updated feedback:', req.params.id);
    res.status(200).json(updatedFeedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(400).json({ 
      message: 'Failed to update feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// DELETE feedback
router.delete('/:id', async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!deletedFeedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    console.log('Successfully deleted feedback:', req.params.id);
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ 
      message: 'Failed to delete feedback',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;