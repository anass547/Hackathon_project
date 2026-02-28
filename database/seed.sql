-- L'Artisan — seed data: 20 artisans (Marrakech, Casablanca, Rabat) + 10 jobs
-- Run after schema.sql. Uses auth.users from Supabase; we insert profiles and artisans.
-- For demo, we use fake UUIDs for profiles that would normally come from Supabase Auth.

-- Insert demo profiles (use real Supabase auth UUIDs in production)
INSERT INTO profiles (id, role, full_name, phone, city) VALUES
('a0000001-0000-4000-8000-000000000001', 'client', 'Ahmed Client', '+212600111101', 'Marrakech'),
('a0000002-0000-4000-8000-000000000002', 'client', 'Fatima Client', '+212600111102', 'Casablanca'),
('a0000003-0000-4000-8000-000000000003', 'worker', 'Omar Zlayji', '+212600222201', 'Marrakech'),
('a0000004-0000-4000-8000-000000000004', 'worker', 'Youssef Sebbagh', '+212600222202', 'Marrakech'),
('a0000005-0000-4000-8000-000000000005', 'worker', 'Hassan Gebbas', '+212600222203', 'Marrakech'),
('a0000006-0000-4000-8000-000000000006', 'worker', 'Karim Plombier', '+212600222204', 'Marrakech'),
('a0000007-0000-4000-8000-000000000007', 'worker', 'Rachid Electricien', '+212600222205', 'Marrakech'),
('a0000008-0000-4000-8000-000000000008', 'worker', 'Mustapha Zlayji', '+212600222206', 'Casablanca'),
('a0000009-0000-4000-8000-000000000009', 'worker', 'Ibrahim Sebbagh', '+212600222207', 'Casablanca'),
('a000000a-0000-4000-8000-00000000000a', 'worker', 'Khalid Gebbas', '+212600222208', 'Casablanca'),
('a000000b-0000-4000-8000-00000000000b', 'worker', 'Nabil Plombier', '+212600222209', 'Casablanca'),
('a000000c-0000-4000-8000-00000000000c', 'worker', 'Said Electricien', '+21260022220a', 'Casablanca'),
('a000000d-0000-4000-8000-00000000000d', 'worker', 'Hamid Zlayji', '+21260022220b', 'Rabat'),
('a000000e-0000-4000-8000-00000000000e', 'worker', 'Tariq Sebbagh', '+21260022220c', 'Rabat'),
('a000000f-0000-4000-8000-00000000000f', 'worker', 'Jamal Gebbas', '+21260022220d', 'Rabat'),
('a0000010-0000-4000-8000-000000000010', 'worker', 'Fouad Plombier', '+21260022220e', 'Rabat'),
('a0000011-0000-4000-8000-000000000011', 'worker', 'Larbi Electricien', '+21260022220f', 'Rabat'),
('a0000012-0000-4000-8000-000000000012', 'worker', 'Abdel Zlayji', '+212600222210', 'Marrakech'),
('a0000013-0000-4000-8000-000000000013', 'worker', 'Brahim Sebbagh', '+212600222211', 'Casablanca'),
('a0000014-0000-4000-8000-000000000014', 'worker', 'Chakir Plombier', '+212600222212', 'Rabat')
ON CONFLICT (id) DO NOTHING;

-- Artisans with GPS (Marrakech ~ 31.63, -7.99; Casablanca ~ 33.59, -7.62; Rabat ~ 34.02, -6.83)
INSERT INTO artisans (user_id, profession, description, latitude, longitude, city, base_hourly_rate_mad, current_level, is_available, refusal_count) VALUES
('a0000003-0000-4000-8000-000000000003', 'Zlayji', 'Carrelage et faïence', 31.6295, -7.9811, 'Marrakech', 120, 'Maitre', true, 0),
('a0000004-0000-4000-8000-000000000004', 'Sebbagh', 'Peinture intérieure et extérieure', 31.6320, -7.9890, 'Marrakech', 80, 'Compagnon', true, 0),
('a0000005-0000-4000-8000-000000000005', 'Gebbas', 'Plâtrerie et enduits', 31.6280, -7.9950, 'Marrakech', 100, 'Apprenti', true, 0),
('a0000006-0000-4000-8000-000000000006', 'Plombier', 'Fuite, chauffe-eau, sanitaires', 31.6310, -7.9840, 'Marrakech', 150, 'Maitre Maalem', true, 0),
('a0000007-0000-4000-8000-000000000007', 'Electricien', 'Tableau, câblage, dépannage', 31.6300, -7.9860, 'Marrakech', 130, 'Compagnon', true, 0),
('a0000008-0000-4000-8000-000000000008', 'Zlayji', 'Pose carrelage', 33.5883, -7.6114, 'Casablanca', 110, 'Compagnon', true, 0),
('a0000009-0000-4000-8000-000000000009', 'Sebbagh', 'Peinture bâtiment', 33.5920, -7.6180, 'Casablanca', 85, 'Maitre', true, 0),
('a000000a-0000-4000-8000-00000000000a', 'Gebbas', 'Plâtre et ravalement', 33.5900, -7.6150, 'Casablanca', 95, 'Compagnon', true, 0),
('a000000b-0000-4000-8000-00000000000b', 'Plombier', 'Plomberie générale', 33.5910, -7.6120, 'Casablanca', 140, 'Maitre', true, 0),
('a000000c-0000-4000-8000-00000000000c', 'Electricien', 'Installation électrique', 33.5890, -7.6200, 'Casablanca', 125, 'Maitre Maalem', true, 0),
('a000000d-0000-4000-8000-00000000000d', 'Zlayji', 'Carrelage', 34.0209, -6.8416, 'Rabat', 115, 'Apprenti', true, 0),
('a000000e-0000-4000-8000-00000000000e', 'Sebbagh', 'Peinture', 34.0180, -6.8380, 'Rabat', 82, 'Compagnon', true, 0),
('a000000f-0000-4000-8000-00000000000f', 'Gebbas', 'Plâtrerie', 34.0220, -6.8450, 'Rabat', 98, 'Maitre', true, 0),
('a0000010-0000-4000-8000-000000000010', 'Plombier', 'Plomberie', 34.0190, -6.8420, 'Rabat', 145, 'Compagnon', true, 0),
('a0000011-0000-4000-8000-000000000011', 'Electricien', 'Électricité bâtiment', 34.0210, -6.8400, 'Rabat', 128, 'Maitre', true, 0),
('a0000012-0000-4000-8000-000000000012', 'Zlayji', 'Faïence et carrelage', 31.6270, -7.9820, 'Marrakech', 118, 'Compagnon', true, 0),
('a0000013-0000-4000-8000-000000000013', 'Sebbagh', 'Ravalement façade', 33.5870, -7.6140, 'Casablanca', 88, 'Apprenti', true, 0),
('a0000014-0000-4000-8000-000000000014', 'Plombier', 'Chauffe-eau et sanitaires', 34.0170, -6.8390, 'Rabat', 138, 'Maitre Maalem', true, 0)
ON CONFLICT (user_id) DO NOTHING;

-- Artisan stats: one row per artisan
INSERT INTO artisan_stats (artisan_id, total_jobs, on_time_ratio, avg_rating, work_quality_score, reliability_score, communication_score, price_quality_score, innovation_score, global_score)
SELECT id, 0, 1.0, 0, 0, 1.0, 0, 0, 0, 0 FROM artisans
ON CONFLICT (artisan_id) DO NOTHING;

-- 10 demo jobs (various statuses)
INSERT INTO jobs (client_id, artisan_id, status, problem_type, description, city, severity, latitude, longitude, estimated_price_min_mad, estimated_price_max_mad, estimated_duration_hours) VALUES
('a0000001-0000-4000-8000-000000000001', NULL, 'requested', 'Plombier', 'Fuite robinet cuisine', 'Marrakech', 2, 31.6295, -7.9811, 400, 800, 1.5),
('a0000001-0000-4000-8000-000000000001', NULL, 'pending', 'Electricien', 'Tableau à repiquer', 'Marrakech', 3, 31.6300, -7.9850, 800, 1500, 3),
('a0000001-0000-4000-8000-000000000001', (SELECT id FROM artisans LIMIT 1), 'accepted', 'Sebbagh', 'Peinture salon 25m²', 'Marrakech', 2, 31.6310, -7.9820, 1200, 2000, 2),
('a0000002-0000-4000-8000-000000000002', (SELECT id FROM artisans WHERE city='Casablanca' LIMIT 1), 'in_progress', 'Zlayji', 'Carrelage salle de bain', 'Casablanca', 4, 33.5900, -7.6150, 2500, 4000, 4),
('a0000002-0000-4000-8000-000000000002', (SELECT id FROM artisans WHERE city='Casablanca' OFFSET 1 LIMIT 1), 'completed', 'Plombier', 'Chauffe-eau réparé', 'Casablanca', 3, 33.5910, -7.6160, 600, 1000, 2),
('a0000001-0000-4000-8000-000000000001', NULL, 'requested', 'Gebbas', 'Fissure plafond', 'Marrakech', 2, 31.6280, -7.9880, 500, 900, 1.5),
('a0000002-0000-4000-8000-000000000002', NULL, 'requested', 'Electricien', 'Prise supplémentaire', 'Casablanca', 1, 33.5890, -7.6170, 200, 450, 0.5),
('a0000001-0000-4000-8000-000000000001', (SELECT id FROM artisans WHERE city='Rabat' LIMIT 1), 'closed', 'Sebbagh', 'Peinture chambre', 'Rabat', 2, 34.0200, -6.8410, 800, 1300, 2),
('a0000002-0000-4000-8000-000000000002', NULL, 'pending', 'Plombier', 'WC bouché', 'Casablanca', 4, 33.5920, -7.6100, 350, 600, 1),
('a0000001-0000-4000-8000-000000000001', (SELECT id FROM artisans OFFSET 2 LIMIT 1), 'complaint', 'Zlayji', 'Carrelage mal posé', 'Marrakech', 4, 31.6305, -7.9830, 3000, 5000, 5);
