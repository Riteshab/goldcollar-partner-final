/*
  # Create Reviews Table

  1. New Tables
    - `reviews`
      - `id` (uuid, primary key) - Unique identifier for each review
      - `customer_name` (text) - Name of the customer submitting the review
      - `address` (text) - Customer's address
      - `property_type` (text) - Type of property (e.g., Residential, Commercial, Development)
      - `review_text` (text) - The actual review content
      - `rating` (integer) - Star rating from 1 to 5
      - `status` (text) - Review status: 'pending', 'approved', 'rejected'
      - `created_at` (timestamptz) - Timestamp when review was submitted
      - `approved_at` (timestamptz, nullable) - Timestamp when review was approved
      
  2. Security
    - Enable RLS on `reviews` table
    - Add policy for public insert (anyone can submit a review)
    - Add policy for public select of approved reviews only
    - Add policy for authenticated admins to manage all reviews

  3. Indexes
    - Index on status for faster filtering
    - Index on created_at for ordering
*/

CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  address text NOT NULL,
  property_type text NOT NULL,
  review_text text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now(),
  approved_at timestamptz
);

ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a review"
  ON reviews
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view approved reviews"
  ON reviews
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

CREATE POLICY "Admins can view all reviews"
  ON reviews
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can update reviews"
  ON reviews
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Admins can delete reviews"
  ON reviews
  FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS reviews_status_idx ON reviews(status);
CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS reviews_approved_at_idx ON reviews(approved_at DESC);