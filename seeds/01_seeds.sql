INSERT INTO users (name, email, password)
VALUES
  ("Alvin Ng", "alvin@gmail.com", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
  ("Zea Lingard", "zea@gmai.com", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u."),
  ("Harp Sandhu", "harp@gmail.com", "$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.");

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES
  (1, "Rooftop Penthouse", "description", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg", 350, 2, 2, 3, "Canada", "536 Namsub Highway", "Calgary", "Alberta", "X8N 2P5"),
  (2, "Clean Basement Suite", "description", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg", 200, 1, 1, 1, "Canada", "1650 Hejto Center", "Montreal", "Quebec", "T8N 3P7"),
  (3, "Newly Renovated Townhouse", "description", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&h=350", "https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg", 170, 4, 5, 6, "Canada", "513 Powov Grove", "Toronto", "Ontario", "Y7E 4E2");

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES
  ('2018-09-11', '2018-09-26', 2, 3),
  ('2016-1-12', '2016-01-26', 1, 4),
  ('2020-11-01', '2020-12-05', 2, 2);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
  (2, 5, 10, 3, 'messages'),
  (1, 4, 1, 4, 'messages'),
  (5, 6, 7, 5, 'messages');