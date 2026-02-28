-- Insertion de 2 artisans de chaque type pour chaque ville de la région Souss Massa

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('4ccda6b9-a664-4f3e-81d0-f13f09a36e05', 'artisan_agadir_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Agadir 1', '+212641884305', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('5e8835d1-fbc5-43b5-80d8-4e73cc41e2c6', '4ccda6b9-a664-4f3e-81d0-f13f09a36e05', 'Zlayji', 'Agadir', 30.34774, -9.681329, 'Expert Zlayji à Agadir', 53, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('5e8835d1-fbc5-43b5-80d8-4e73cc41e2c6');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('c91cb793-f49d-4dc4-9658-ec6675325c2b', 'artisan_agadir_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Agadir 2', '+212697094013', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('59fe1992-e764-4324-90c7-ce98139ababb', 'c91cb793-f49d-4dc4-9658-ec6675325c2b', 'Zlayji', 'Agadir', 30.444581, -9.660285, 'Expert Zlayji à Agadir', 64, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('59fe1992-e764-4324-90c7-ce98139ababb');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('0c52a801-8c2a-4856-bea6-0aaa36d17696', 'artisan_agadir_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Agadir 1', '+212666048183', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e4092038-94e7-43ea-9978-59bdab633ca0', '0c52a801-8c2a-4856-bea6-0aaa36d17696', 'Sebbagh', 'Agadir', 30.475699, -9.590374, 'Expert Sebbagh à Agadir', 122, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e4092038-94e7-43ea-9978-59bdab633ca0');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('830817e1-4994-4071-8571-c3dfef60f38e', 'artisan_agadir_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Agadir 2', '+212616775297', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('11d4a6d3-947f-4069-9c1f-dda07f6e02a6', '830817e1-4994-4071-8571-c3dfef60f38e', 'Sebbagh', 'Agadir', 30.449612, -9.636723, 'Expert Sebbagh à Agadir', 190, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('11d4a6d3-947f-4069-9c1f-dda07f6e02a6');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('d88b8df0-5256-4b44-98f9-52a3cf406db1', 'artisan_agadir_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Agadir 1', '+212626271360', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('a5efd9c1-51e5-4bd7-9520-9e5aef6d2b88', 'd88b8df0-5256-4b44-98f9-52a3cf406db1', 'Gebbas', 'Agadir', 30.327989, -9.520916, 'Expert Gebbas à Agadir', 197, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('a5efd9c1-51e5-4bd7-9520-9e5aef6d2b88');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('96b5ac98-a3df-4b1c-994b-61492f5bed3f', 'artisan_agadir_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Agadir 2', '+212655604089', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('a056ff0e-b4c4-434e-8ded-29b90ef4c37b', '96b5ac98-a3df-4b1c-994b-61492f5bed3f', 'Gebbas', 'Agadir', 30.467942, -9.515919, 'Expert Gebbas à Agadir', 80, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('a056ff0e-b4c4-434e-8ded-29b90ef4c37b');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('b6171c6b-776e-4a43-b2bf-c304e088a4f3', 'artisan_agadir_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Agadir 1', '+212631609302', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('c4df7106-edac-4278-b589-f5d278bb0952', 'b6171c6b-776e-4a43-b2bf-c304e088a4f3', 'Plombier', 'Agadir', 30.325343, -9.580407, 'Expert Plombier à Agadir', 144, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('c4df7106-edac-4278-b589-f5d278bb0952');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('60ff6501-d2a6-4ed3-b1d5-55e0b115afb7', 'artisan_agadir_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Agadir 2', '+212668661849', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('66786c2d-55b7-450d-b838-e554987c4cc4', '60ff6501-d2a6-4ed3-b1d5-55e0b115afb7', 'Plombier', 'Agadir', 30.499413, -9.687074, 'Expert Plombier à Agadir', 147, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('66786c2d-55b7-450d-b838-e554987c4cc4');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('86063f94-2fd6-4dd6-974f-e0e90c744bad', 'artisan_agadir_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Agadir 1', '+212654239413', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('771ad19c-84ee-49de-aecf-53b66202ec6f', '86063f94-2fd6-4dd6-974f-e0e90c744bad', 'Electricien', 'Agadir', 30.359292, -9.652422, 'Expert Electricien à Agadir', 193, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('771ad19c-84ee-49de-aecf-53b66202ec6f');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('9eef73d5-1ec4-42a0-ab81-ce631ea97ae3', 'artisan_agadir_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Agadir 2', '+212690995187', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('7c41def2-b86d-40ec-9450-82a5978aa7f3', '9eef73d5-1ec4-42a0-ab81-ce631ea97ae3', 'Electricien', 'Agadir', 30.363627, -9.651298, 'Expert Electricien à Agadir', 101, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('7c41def2-b86d-40ec-9450-82a5978aa7f3');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('1efcd799-5dd2-498e-9967-3aef0cca5cb9', 'artisan_inezgane_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Inezgane 1', '+212633960526', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('2e2e226d-3649-4f0c-af30-3defad143bac', '1efcd799-5dd2-498e-9967-3aef0cca5cb9', 'Zlayji', 'Inezgane', 30.328903, -9.589, 'Expert Zlayji à Inezgane', 192, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('2e2e226d-3649-4f0c-af30-3defad143bac');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('39834882-62b7-4626-a0ac-7d7588b35ab0', 'artisan_inezgane_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Inezgane 2', '+212661264606', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('5820b95e-b157-4a93-814c-27cd6b5c65b7', '39834882-62b7-4626-a0ac-7d7588b35ab0', 'Zlayji', 'Inezgane', 30.439871, -9.572544, 'Expert Zlayji à Inezgane', 166, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('5820b95e-b157-4a93-814c-27cd6b5c65b7');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('d4e643b2-4bf5-48e1-bc1a-68ff55cb3475', 'artisan_inezgane_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Inezgane 1', '+212684659621', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('4710f2d4-050d-4d03-9f81-760dae0b9484', 'd4e643b2-4bf5-48e1-bc1a-68ff55cb3475', 'Sebbagh', 'Inezgane', 30.356824, -9.645293, 'Expert Sebbagh à Inezgane', 75, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('4710f2d4-050d-4d03-9f81-760dae0b9484');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('ec3d5f6b-d2f7-4d78-9a1e-4fdccf1e372f', 'artisan_inezgane_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Inezgane 2', '+212631087939', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('81a643ba-f41f-49bc-85d3-0d8e1630c614', 'ec3d5f6b-d2f7-4d78-9a1e-4fdccf1e372f', 'Sebbagh', 'Inezgane', 30.359835, -9.658407, 'Expert Sebbagh à Inezgane', 131, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('81a643ba-f41f-49bc-85d3-0d8e1630c614');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('e63474e7-8b8b-4ca3-b59f-fdafb028d123', 'artisan_inezgane_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Inezgane 1', '+212641527845', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('38c0dd19-3645-44b3-a4d4-9f54b5e4aaf0', 'e63474e7-8b8b-4ca3-b59f-fdafb028d123', 'Gebbas', 'Inezgane', 30.446327, -9.620861, 'Expert Gebbas à Inezgane', 89, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('38c0dd19-3645-44b3-a4d4-9f54b5e4aaf0');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('2cc2f707-caf1-4c62-83ca-d329414183f6', 'artisan_inezgane_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Inezgane 2', '+212687942754', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('2f279c44-801d-47ef-95db-b4df5f562ce2', '2cc2f707-caf1-4c62-83ca-d329414183f6', 'Gebbas', 'Inezgane', 30.440937, -9.570394, 'Expert Gebbas à Inezgane', 144, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('2f279c44-801d-47ef-95db-b4df5f562ce2');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('4b1dc4cb-2776-460e-9ec5-ee26df7db2b6', 'artisan_inezgane_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Inezgane 1', '+212642280927', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('7aaad04b-f70c-4a81-a2ca-860b714bb91c', '4b1dc4cb-2776-460e-9ec5-ee26df7db2b6', 'Plombier', 'Inezgane', 30.488328, -9.553879, 'Expert Plombier à Inezgane', 156, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('7aaad04b-f70c-4a81-a2ca-860b714bb91c');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('3cd92e0c-6133-49ec-aba2-c5ad26c7d7cc', 'artisan_inezgane_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Inezgane 2', '+212675797314', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('5213d732-3725-4d92-8611-1f720dc66e20', '3cd92e0c-6133-49ec-aba2-c5ad26c7d7cc', 'Plombier', 'Inezgane', 30.340989, -9.60358, 'Expert Plombier à Inezgane', 136, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('5213d732-3725-4d92-8611-1f720dc66e20');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('d56f71a4-dade-4419-841e-41872f04a1d3', 'artisan_inezgane_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Inezgane 1', '+212638230632', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e4d8e713-5cae-4569-9a73-7957dff500b5', 'd56f71a4-dade-4419-841e-41872f04a1d3', 'Electricien', 'Inezgane', 30.421392, -9.582133, 'Expert Electricien à Inezgane', 76, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e4d8e713-5cae-4569-9a73-7957dff500b5');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('b9e2ca97-8489-44d4-a094-402d24f2edc7', 'artisan_inezgane_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Inezgane 2', '+212686767927', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b28b2346-430d-4a49-9a7c-fc9c3f55b1de', 'b9e2ca97-8489-44d4-a094-402d24f2edc7', 'Electricien', 'Inezgane', 30.357707, -9.608935, 'Expert Electricien à Inezgane', 156, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b28b2346-430d-4a49-9a7c-fc9c3f55b1de');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('8e411ea5-c1e0-4c5f-81a4-9bbb637bf84d', 'artisan_aitmelloul_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Ait Melloul 1', '+212648600017', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('d34a4e99-fae0-4b43-9c16-af11fdcf5ec5', '8e411ea5-c1e0-4c5f-81a4-9bbb637bf84d', 'Zlayji', 'Ait Melloul', 30.39776, -9.640614, 'Expert Zlayji à Ait Melloul', 107, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('d34a4e99-fae0-4b43-9c16-af11fdcf5ec5');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('34511550-ccb6-47f1-8a24-634e88e218df', 'artisan_aitmelloul_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Ait Melloul 2', '+212645842299', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('1afbe6e5-4b4b-41d4-bfe4-4458bfe91506', '34511550-ccb6-47f1-8a24-634e88e218df', 'Zlayji', 'Ait Melloul', 30.406681, -9.613748, 'Expert Zlayji à Ait Melloul', 156, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('1afbe6e5-4b4b-41d4-bfe4-4458bfe91506');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('28535950-26e5-4125-9cdc-3a48da69fdfb', 'artisan_aitmelloul_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Ait Melloul 1', '+212698537789', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('f160acaf-3647-4e4d-9cf7-165735b3ca00', '28535950-26e5-4125-9cdc-3a48da69fdfb', 'Sebbagh', 'Ait Melloul', 30.428453, -9.604255, 'Expert Sebbagh à Ait Melloul', 150, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('f160acaf-3647-4e4d-9cf7-165735b3ca00');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('79a1d8af-891f-4ec7-b67f-b9b7c77c8b6b', 'artisan_aitmelloul_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Ait Melloul 2', '+212641633217', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e7f2d1d6-04b2-4de7-b459-4ce472275c08', '79a1d8af-891f-4ec7-b67f-b9b7c77c8b6b', 'Sebbagh', 'Ait Melloul', 30.325895, -9.627169, 'Expert Sebbagh à Ait Melloul', 59, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e7f2d1d6-04b2-4de7-b459-4ce472275c08');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('83a43ef0-211d-4ffd-839e-b0ad42de6201', 'artisan_aitmelloul_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Ait Melloul 1', '+212661221759', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('df8ebcad-fb6a-48a3-8b09-d80569e6c9cd', '83a43ef0-211d-4ffd-839e-b0ad42de6201', 'Gebbas', 'Ait Melloul', 30.314919, -9.695367, 'Expert Gebbas à Ait Melloul', 149, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('df8ebcad-fb6a-48a3-8b09-d80569e6c9cd');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('8826c1c1-3761-4f5e-a975-f362334ee438', 'artisan_aitmelloul_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Ait Melloul 2', '+212658890087', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('66ed82c5-e773-495e-b28c-0129fbaa4bfc', '8826c1c1-3761-4f5e-a975-f362334ee438', 'Gebbas', 'Ait Melloul', 30.400532, -9.67315, 'Expert Gebbas à Ait Melloul', 173, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('66ed82c5-e773-495e-b28c-0129fbaa4bfc');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('3dcf9411-d93c-4595-83ba-e8d3c1a6f38e', 'artisan_aitmelloul_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Ait Melloul 1', '+212653253060', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b87b42e4-19c7-4a3e-bc03-099bac784217', '3dcf9411-d93c-4595-83ba-e8d3c1a6f38e', 'Plombier', 'Ait Melloul', 30.335909, -9.690695, 'Expert Plombier à Ait Melloul', 179, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b87b42e4-19c7-4a3e-bc03-099bac784217');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('bc31fdd5-4b83-4100-b4e4-223a4d9649bc', 'artisan_aitmelloul_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Ait Melloul 2', '+212633941514', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('05db2764-1faf-402c-81b9-6272193d867a', 'bc31fdd5-4b83-4100-b4e4-223a4d9649bc', 'Plombier', 'Ait Melloul', 30.334448, -9.632817, 'Expert Plombier à Ait Melloul', 113, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('05db2764-1faf-402c-81b9-6272193d867a');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('e43a41d8-16a4-430f-8e02-64d5b4ab6ca9', 'artisan_aitmelloul_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Ait Melloul 1', '+212630056801', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('486b6d40-8c55-4fbe-a71f-920ab05d4609', 'e43a41d8-16a4-430f-8e02-64d5b4ab6ca9', 'Electricien', 'Ait Melloul', 30.496311, -9.565323, 'Expert Electricien à Ait Melloul', 108, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('486b6d40-8c55-4fbe-a71f-920ab05d4609');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('0075c529-5b79-4f60-b5cc-43846629ae4e', 'artisan_aitmelloul_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Ait Melloul 2', '+212620185956', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('a669c4e2-2031-4b56-9c55-f097c0150076', '0075c529-5b79-4f60-b5cc-43846629ae4e', 'Electricien', 'Ait Melloul', 30.439189, -9.567511, 'Expert Electricien à Ait Melloul', 63, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('a669c4e2-2031-4b56-9c55-f097c0150076');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('9d6d78ce-7cf1-4b5e-806b-2faf2d06bd47', 'artisan_dcheira_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Dcheira 1', '+212651923938', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('3075d20d-6b4b-4f7d-ac64-e84598fc9e7d', '9d6d78ce-7cf1-4b5e-806b-2faf2d06bd47', 'Zlayji', 'Dcheira', 30.357516, -9.614012, 'Expert Zlayji à Dcheira', 101, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('3075d20d-6b4b-4f7d-ac64-e84598fc9e7d');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('eb1d3137-ea77-4101-bf7b-f7304d01bf1a', 'artisan_dcheira_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Dcheira 2', '+212686641338', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('9304687a-2a1a-47fb-8bcc-531a2c660b15', 'eb1d3137-ea77-4101-bf7b-f7304d01bf1a', 'Zlayji', 'Dcheira', 30.321864, -9.578366, 'Expert Zlayji à Dcheira', 186, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('9304687a-2a1a-47fb-8bcc-531a2c660b15');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('315c6f51-6c97-49c9-9a34-18757269f042', 'artisan_dcheira_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Dcheira 1', '+212640726934', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('99a8844b-267d-4810-9583-2f15b7de725c', '315c6f51-6c97-49c9-9a34-18757269f042', 'Sebbagh', 'Dcheira', 30.462208, -9.695119, 'Expert Sebbagh à Dcheira', 51, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('99a8844b-267d-4810-9583-2f15b7de725c');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('51178666-1b02-48c1-aba5-60f82432a25c', 'artisan_dcheira_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Dcheira 2', '+212656211330', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('6f6b514f-cf58-47a0-974e-f3a4b74f3b83', '51178666-1b02-48c1-aba5-60f82432a25c', 'Sebbagh', 'Dcheira', 30.340218, -9.600713, 'Expert Sebbagh à Dcheira', 170, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('6f6b514f-cf58-47a0-974e-f3a4b74f3b83');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('dd0587ba-24a3-4d6c-ad0b-0db1d7bc462b', 'artisan_dcheira_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Dcheira 1', '+212637535872', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('9f6c6970-f378-4f64-9937-4f8884ede654', 'dd0587ba-24a3-4d6c-ad0b-0db1d7bc462b', 'Gebbas', 'Dcheira', 30.319458, -9.610619, 'Expert Gebbas à Dcheira', 90, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('9f6c6970-f378-4f64-9937-4f8884ede654');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('2f7aba15-79a2-4b8e-963f-f6799507b9c2', 'artisan_dcheira_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Dcheira 2', '+212616977834', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('71cee080-1e50-4670-a513-f5198fcd8e39', '2f7aba15-79a2-4b8e-963f-f6799507b9c2', 'Gebbas', 'Dcheira', 30.480805, -9.665405, 'Expert Gebbas à Dcheira', 118, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('71cee080-1e50-4670-a513-f5198fcd8e39');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('f5ab9404-cfbb-40a0-8931-daefab41d79d', 'artisan_dcheira_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Dcheira 1', '+212657516208', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('ddf01dba-82c4-4e38-8a01-b75889c4b309', 'f5ab9404-cfbb-40a0-8931-daefab41d79d', 'Plombier', 'Dcheira', 30.36481, -9.638793, 'Expert Plombier à Dcheira', 69, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('ddf01dba-82c4-4e38-8a01-b75889c4b309');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('fe79aeed-92c9-4fb6-8372-77d4405b0e63', 'artisan_dcheira_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Dcheira 2', '+212617908958', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e74a8f54-8940-470f-bdc4-b96c8eed2eb0', 'fe79aeed-92c9-4fb6-8372-77d4405b0e63', 'Plombier', 'Dcheira', 30.317276, -9.545104, 'Expert Plombier à Dcheira', 107, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e74a8f54-8940-470f-bdc4-b96c8eed2eb0');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('521b12e3-152f-41a6-a409-b9d74a1cce5b', 'artisan_dcheira_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Dcheira 1', '+212641684588', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('dd2a768b-1e21-4446-8bd1-0072b40aa284', '521b12e3-152f-41a6-a409-b9d74a1cce5b', 'Electricien', 'Dcheira', 30.440437, -9.533047, 'Expert Electricien à Dcheira', 98, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('dd2a768b-1e21-4446-8bd1-0072b40aa284');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('b8b8e93e-7623-4ec2-8e08-b188c2dc804a', 'artisan_dcheira_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Dcheira 2', '+212680363320', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('50a9b68d-50fe-40df-a515-59c827695cbb', 'b8b8e93e-7623-4ec2-8e08-b188c2dc804a', 'Electricien', 'Dcheira', 30.436151, -9.518871, 'Expert Electricien à Dcheira', 56, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('50a9b68d-50fe-40df-a515-59c827695cbb');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('e0fa963a-5320-40f2-aba2-25b5bef23b4f', 'artisan_taroudant_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Taroudant 1', '+212619718655', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e17f9dcd-3591-45f6-a766-19976faf4bbc', 'e0fa963a-5320-40f2-aba2-25b5bef23b4f', 'Zlayji', 'Taroudant', 30.419716, -9.561806, 'Expert Zlayji à Taroudant', 76, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e17f9dcd-3591-45f6-a766-19976faf4bbc');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('ee9f9da0-c972-4591-8617-9b05a1db2555', 'artisan_taroudant_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Taroudant 2', '+212631671602', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b7c72513-06f9-428a-b83d-d66dc6914436', 'ee9f9da0-c972-4591-8617-9b05a1db2555', 'Zlayji', 'Taroudant', 30.476574, -9.607264, 'Expert Zlayji à Taroudant', 101, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b7c72513-06f9-428a-b83d-d66dc6914436');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('436ee3c1-7ec2-4578-b352-f5a9476b1fbc', 'artisan_taroudant_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Taroudant 1', '+212686232907', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('c394f0a7-53ef-4161-9482-c7c1b1cb42d3', '436ee3c1-7ec2-4578-b352-f5a9476b1fbc', 'Sebbagh', 'Taroudant', 30.308015, -9.695711, 'Expert Sebbagh à Taroudant', 159, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('c394f0a7-53ef-4161-9482-c7c1b1cb42d3');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('ef4e656d-37e5-47a6-a1ee-bcfff5714f84', 'artisan_taroudant_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Taroudant 2', '+212692065825', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('39508f16-1ddc-4e24-933a-6c32718de50f', 'ef4e656d-37e5-47a6-a1ee-bcfff5714f84', 'Sebbagh', 'Taroudant', 30.363841, -9.539043, 'Expert Sebbagh à Taroudant', 111, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('39508f16-1ddc-4e24-933a-6c32718de50f');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('e54d7968-ba93-4aaa-8f26-d3ba397af140', 'artisan_taroudant_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Taroudant 1', '+212668546141', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('5a0923df-5e12-4314-a3d2-e1a4614666ea', 'e54d7968-ba93-4aaa-8f26-d3ba397af140', 'Gebbas', 'Taroudant', 30.467025, -9.65937, 'Expert Gebbas à Taroudant', 192, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('5a0923df-5e12-4314-a3d2-e1a4614666ea');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('cc55b21b-9c41-4fef-9432-2b1c260a3f6a', 'artisan_taroudant_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Taroudant 2', '+212675332876', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('d3870537-5bb1-48e8-9250-a02f44814327', 'cc55b21b-9c41-4fef-9432-2b1c260a3f6a', 'Gebbas', 'Taroudant', 30.335933, -9.647915, 'Expert Gebbas à Taroudant', 161, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('d3870537-5bb1-48e8-9250-a02f44814327');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('0bb183bc-3053-4bf9-9eec-e141e83034e9', 'artisan_taroudant_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Taroudant 1', '+212662222111', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('92694901-c8a2-4984-808a-d13fa03bb5da', '0bb183bc-3053-4bf9-9eec-e141e83034e9', 'Plombier', 'Taroudant', 30.439932, -9.611529, 'Expert Plombier à Taroudant', 67, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('92694901-c8a2-4984-808a-d13fa03bb5da');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('f5d0293d-6f83-4941-9984-4a1c0a59328b', 'artisan_taroudant_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Taroudant 2', '+212645741078', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('4482bc88-0029-4206-8bd2-34456151b917', 'f5d0293d-6f83-4941-9984-4a1c0a59328b', 'Plombier', 'Taroudant', 30.430062, -9.695107, 'Expert Plombier à Taroudant', 85, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('4482bc88-0029-4206-8bd2-34456151b917');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('73f6dc33-10e8-4090-a98d-ee36bf5a734f', 'artisan_taroudant_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Taroudant 1', '+212641123349', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('57d1acbc-e406-4672-af2d-6eea1cc9b8b0', '73f6dc33-10e8-4090-a98d-ee36bf5a734f', 'Electricien', 'Taroudant', 30.499401, -9.685643, 'Expert Electricien à Taroudant', 52, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('57d1acbc-e406-4672-af2d-6eea1cc9b8b0');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('c250a862-818c-46af-84a1-475ff2d42c83', 'artisan_taroudant_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Taroudant 2', '+212652531854', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b530481b-f139-4ec2-851f-3495e8b9708a', 'c250a862-818c-46af-84a1-475ff2d42c83', 'Electricien', 'Taroudant', 30.365849, -9.684283, 'Expert Electricien à Taroudant', 128, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b530481b-f139-4ec2-851f-3495e8b9708a');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('dc709ce8-6f4d-49c3-94ca-8b0388e357a3', 'artisan_tiznit_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Tiznit 1', '+212674616207', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('6160b69d-20f0-4e1f-a756-fdc784841c6a', 'dc709ce8-6f4d-49c3-94ca-8b0388e357a3', 'Zlayji', 'Tiznit', 30.372024, -9.529, 'Expert Zlayji à Tiznit', 192, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('6160b69d-20f0-4e1f-a756-fdc784841c6a');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('48cdcf39-69e6-4e78-ac05-f2ae31404980', 'artisan_tiznit_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Tiznit 2', '+212633462578', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('cab47938-8317-48da-82d5-c617a4430092', '48cdcf39-69e6-4e78-ac05-f2ae31404980', 'Zlayji', 'Tiznit', 30.346245, -9.558685, 'Expert Zlayji à Tiznit', 168, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('cab47938-8317-48da-82d5-c617a4430092');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('3442cc2d-5791-4a74-89a3-c880db476cbe', 'artisan_tiznit_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Tiznit 1', '+212647972278', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('f56e8adf-55db-420f-847c-20244fbedbcf', '3442cc2d-5791-4a74-89a3-c880db476cbe', 'Sebbagh', 'Tiznit', 30.420824, -9.624516, 'Expert Sebbagh à Tiznit', 153, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('f56e8adf-55db-420f-847c-20244fbedbcf');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('36512c36-0a8c-447e-96d6-edd8032217c3', 'artisan_tiznit_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Tiznit 2', '+212669612941', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('45fdb743-43a1-4d8e-b8e8-718b9e030562', '36512c36-0a8c-447e-96d6-edd8032217c3', 'Sebbagh', 'Tiznit', 30.397673, -9.504419, 'Expert Sebbagh à Tiznit', 92, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('45fdb743-43a1-4d8e-b8e8-718b9e030562');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('47b53035-61a7-4d50-a95a-39f950a3a1ca', 'artisan_tiznit_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Tiznit 1', '+212640075279', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('7067eb9b-f58f-4d84-840a-e09ef915050a', '47b53035-61a7-4d50-a95a-39f950a3a1ca', 'Gebbas', 'Tiznit', 30.410264, -9.577437, 'Expert Gebbas à Tiznit', 91, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('7067eb9b-f58f-4d84-840a-e09ef915050a');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('3aba8b73-a65e-47ab-ab03-411f99608c9a', 'artisan_tiznit_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Tiznit 2', '+212660979681', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('cb98f1c2-a467-49da-98a0-b654c94ef144', '3aba8b73-a65e-47ab-ab03-411f99608c9a', 'Gebbas', 'Tiznit', 30.354419, -9.60765, 'Expert Gebbas à Tiznit', 188, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('cb98f1c2-a467-49da-98a0-b654c94ef144');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('0838b091-a482-4cb4-b19c-8e853f8ab337', 'artisan_tiznit_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Tiznit 1', '+212658087567', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('f41ff800-4484-431a-8c31-98c5f912bec9', '0838b091-a482-4cb4-b19c-8e853f8ab337', 'Plombier', 'Tiznit', 30.317408, -9.57672, 'Expert Plombier à Tiznit', 54, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('f41ff800-4484-431a-8c31-98c5f912bec9');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('5028a778-bb12-4789-8a06-720a72d7a773', 'artisan_tiznit_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Tiznit 2', '+212623952108', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('8259396c-9965-47d8-b5a2-f83cacc58dfd', '5028a778-bb12-4789-8a06-720a72d7a773', 'Plombier', 'Tiznit', 30.331586, -9.562112, 'Expert Plombier à Tiznit', 122, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('8259396c-9965-47d8-b5a2-f83cacc58dfd');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('eab92d43-3cf5-4588-bf93-791bd3216fee', 'artisan_tiznit_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Tiznit 1', '+212674543603', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('a3b744a5-2f78-4c3b-b72d-fe330d84adbc', 'eab92d43-3cf5-4588-bf93-791bd3216fee', 'Electricien', 'Tiznit', 30.446142, -9.554976, 'Expert Electricien à Tiznit', 111, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('a3b744a5-2f78-4c3b-b72d-fe330d84adbc');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('a234e1af-d6f4-454f-b54f-29062c6fb8f3', 'artisan_tiznit_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Tiznit 2', '+212629445338', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('759f7857-a175-4af5-9bd4-8595eae5ebe2', 'a234e1af-d6f4-454f-b54f-29062c6fb8f3', 'Electricien', 'Tiznit', 30.336542, -9.676164, 'Expert Electricien à Tiznit', 77, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('759f7857-a175-4af5-9bd4-8595eae5ebe2');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('4812f4b3-ef7f-4347-a5ec-a60e23c0dcca', 'artisan_tata_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Tata 1', '+212615625642', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e3ed136f-b320-4fb7-a4b0-29a26c1d62ce', '4812f4b3-ef7f-4347-a5ec-a60e23c0dcca', 'Zlayji', 'Tata', 30.368049, -9.665969, 'Expert Zlayji à Tata', 68, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e3ed136f-b320-4fb7-a4b0-29a26c1d62ce');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('87f08d33-adba-4462-bcd9-2c70e38a2de0', 'artisan_tata_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Tata 2', '+212639841595', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('09365ee2-a1ae-4be0-88d6-22a855e97fc7', '87f08d33-adba-4462-bcd9-2c70e38a2de0', 'Zlayji', 'Tata', 30.329137, -9.673115, 'Expert Zlayji à Tata', 192, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('09365ee2-a1ae-4be0-88d6-22a855e97fc7');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('3c68a81e-f008-4df7-93fd-a16fdcc61689', 'artisan_tata_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Tata 1', '+212648487362', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e4e43f25-d458-464b-b91c-1a2e7dace7fe', '3c68a81e-f008-4df7-93fd-a16fdcc61689', 'Sebbagh', 'Tata', 30.463357, -9.689393, 'Expert Sebbagh à Tata', 179, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e4e43f25-d458-464b-b91c-1a2e7dace7fe');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('9ebee48e-ec37-4594-bea6-3d921cf318e1', 'artisan_tata_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Tata 2', '+212616599061', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('927b7d56-7754-421a-b64a-e01f181bd02a', '9ebee48e-ec37-4594-bea6-3d921cf318e1', 'Sebbagh', 'Tata', 30.410496, -9.573441, 'Expert Sebbagh à Tata', 131, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('927b7d56-7754-421a-b64a-e01f181bd02a');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('a08b2e39-be13-42a5-8398-dcb88bc155ac', 'artisan_tata_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Tata 1', '+212651125707', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('cbb6bcdf-a783-4dd7-9eae-ddb4ab7e1d38', 'a08b2e39-be13-42a5-8398-dcb88bc155ac', 'Gebbas', 'Tata', 30.422651, -9.558252, 'Expert Gebbas à Tata', 75, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('cbb6bcdf-a783-4dd7-9eae-ddb4ab7e1d38');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('2d26f143-82ae-4a81-b584-4f332533619d', 'artisan_tata_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Tata 2', '+212663575470', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e690fbf6-7cc5-4846-a8f8-c6ef36d8199d', '2d26f143-82ae-4a81-b584-4f332533619d', 'Gebbas', 'Tata', 30.301174, -9.65283, 'Expert Gebbas à Tata', 134, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e690fbf6-7cc5-4846-a8f8-c6ef36d8199d');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('00576e9d-91ff-4428-b3a6-245e0ee2e608', 'artisan_tata_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Tata 1', '+212671091904', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('96204f9f-0f7b-4bbc-bb85-d0b8289fd54f', '00576e9d-91ff-4428-b3a6-245e0ee2e608', 'Plombier', 'Tata', 30.375001, -9.568891, 'Expert Plombier à Tata', 155, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('96204f9f-0f7b-4bbc-bb85-d0b8289fd54f');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('e31a4507-c447-4e4d-a6e1-9ce43a6a46cd', 'artisan_tata_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Tata 2', '+212643229741', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('2583c95e-468e-447d-9e2e-5f42aa393925', 'e31a4507-c447-4e4d-a6e1-9ce43a6a46cd', 'Plombier', 'Tata', 30.409103, -9.698157, 'Expert Plombier à Tata', 85, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('2583c95e-468e-447d-9e2e-5f42aa393925');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('9d5c7fa6-0a7d-408c-b8cf-10d822acdd4a', 'artisan_tata_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Tata 1', '+212678091246', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('28a1f342-ae94-468a-8eca-3056784dfc41', '9d5c7fa6-0a7d-408c-b8cf-10d822acdd4a', 'Electricien', 'Tata', 30.488937, -9.673449, 'Expert Electricien à Tata', 66, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('28a1f342-ae94-468a-8eca-3056784dfc41');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('c18bc681-8016-4b83-9703-ad894fc30b3e', 'artisan_tata_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Tata 2', '+212622146560', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('abffb964-152f-490f-b893-f4b205ad7e58', 'c18bc681-8016-4b83-9703-ad894fc30b3e', 'Electricien', 'Tata', 30.486766, -9.518881, 'Expert Electricien à Tata', 146, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('abffb964-152f-490f-b893-f4b205ad7e58');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('92ab62e8-3137-4b5d-b4fb-a61f6f85e5b4', 'artisan_chtoukaaitbaha_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Chtouka Ait Baha 1', '+212657682384', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('d796b957-a4b5-4be5-a855-f18e6295ae84', '92ab62e8-3137-4b5d-b4fb-a61f6f85e5b4', 'Zlayji', 'Chtouka Ait Baha', 30.448023, -9.628807, 'Expert Zlayji à Chtouka Ait Baha', 132, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('d796b957-a4b5-4be5-a855-f18e6295ae84');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('3dcf7167-dc88-4ed0-8027-d7c6b2997237', 'artisan_chtoukaaitbaha_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Chtouka Ait Baha 2', '+212657486256', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b325f69a-32ce-44f4-8fb3-15e1bdf9e118', '3dcf7167-dc88-4ed0-8027-d7c6b2997237', 'Zlayji', 'Chtouka Ait Baha', 30.432826, -9.633201, 'Expert Zlayji à Chtouka Ait Baha', 114, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b325f69a-32ce-44f4-8fb3-15e1bdf9e118');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('cab18b43-dd33-40cc-83f2-3a0869333ab1', 'artisan_chtoukaaitbaha_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Chtouka Ait Baha 1', '+212670347759', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('0f64ea1b-35cf-4e83-98c8-33609e6f266f', 'cab18b43-dd33-40cc-83f2-3a0869333ab1', 'Sebbagh', 'Chtouka Ait Baha', 30.331129, -9.624525, 'Expert Sebbagh à Chtouka Ait Baha', 86, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('0f64ea1b-35cf-4e83-98c8-33609e6f266f');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('2806ebdc-30d5-4930-9895-c8d350cd4ae9', 'artisan_chtoukaaitbaha_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Chtouka Ait Baha 2', '+212697406430', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('078b0cb2-772a-4f88-94cb-1769a457ca1b', '2806ebdc-30d5-4930-9895-c8d350cd4ae9', 'Sebbagh', 'Chtouka Ait Baha', 30.398451, -9.511993, 'Expert Sebbagh à Chtouka Ait Baha', 151, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('078b0cb2-772a-4f88-94cb-1769a457ca1b');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('1e22462f-d152-41fc-b407-e2198b548f37', 'artisan_chtoukaaitbaha_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Chtouka Ait Baha 1', '+212682799625', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b083ac0b-3dca-4ea4-b81d-51ff8fa348ea', '1e22462f-d152-41fc-b407-e2198b548f37', 'Gebbas', 'Chtouka Ait Baha', 30.339976, -9.694358, 'Expert Gebbas à Chtouka Ait Baha', 113, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b083ac0b-3dca-4ea4-b81d-51ff8fa348ea');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('470f2eba-86cf-45c4-80fd-0316e0c025f6', 'artisan_chtoukaaitbaha_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Chtouka Ait Baha 2', '+212655446680', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('176ac0ab-e189-4dcb-b77e-5166e9c16c23', '470f2eba-86cf-45c4-80fd-0316e0c025f6', 'Gebbas', 'Chtouka Ait Baha', 30.340666, -9.500129, 'Expert Gebbas à Chtouka Ait Baha', 163, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('176ac0ab-e189-4dcb-b77e-5166e9c16c23');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('496b633d-b5b5-4a9c-b920-dd7becc3e95b', 'artisan_chtoukaaitbaha_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Chtouka Ait Baha 1', '+212685417300', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('6cacb039-f5d9-4617-85de-e7424975a42f', '496b633d-b5b5-4a9c-b920-dd7becc3e95b', 'Plombier', 'Chtouka Ait Baha', 30.340562, -9.662644, 'Expert Plombier à Chtouka Ait Baha', 142, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('6cacb039-f5d9-4617-85de-e7424975a42f');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('448db3d6-fd7a-4095-928b-0c497de15090', 'artisan_chtoukaaitbaha_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Chtouka Ait Baha 2', '+212688107382', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('45c06db2-2c17-4e28-9249-7b2c5d73831d', '448db3d6-fd7a-4095-928b-0c497de15090', 'Plombier', 'Chtouka Ait Baha', 30.334995, -9.632009, 'Expert Plombier à Chtouka Ait Baha', 94, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('45c06db2-2c17-4e28-9249-7b2c5d73831d');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('c2605481-038f-4361-893c-f7c93538f38b', 'artisan_chtoukaaitbaha_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Chtouka Ait Baha 1', '+212629366516', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('05c435a9-d105-49f3-9302-2ccb68e2273d', 'c2605481-038f-4361-893c-f7c93538f38b', 'Electricien', 'Chtouka Ait Baha', 30.414928, -9.541098, 'Expert Electricien à Chtouka Ait Baha', 124, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('05c435a9-d105-49f3-9302-2ccb68e2273d');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('53fc84ee-c13e-4b58-9ca1-5397337801aa', 'artisan_chtoukaaitbaha_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Chtouka Ait Baha 2', '+212650815204', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('571b01dd-0e72-4869-a3dd-e4a04be124e6', '53fc84ee-c13e-4b58-9ca1-5397337801aa', 'Electricien', 'Chtouka Ait Baha', 30.382561, -9.657652, 'Expert Electricien à Chtouka Ait Baha', 196, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('571b01dd-0e72-4869-a3dd-e4a04be124e6');
