-- Insertion de 2 artisans de chaque type pour chaque ville de la région Souss Massa

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('be82d182-4efa-42ad-82fa-8df704bee690', 'artisan_agadir_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Agadir 1', '+212669017179', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('489ea977-a74d-4d60-b2b9-ae6dc6ef5478', 'be82d182-4efa-42ad-82fa-8df704bee690', 'Zlayji', 'Agadir', 30.487954, -9.655751, 'Expert Zlayji à Agadir', 102, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('489ea977-a74d-4d60-b2b9-ae6dc6ef5478');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('4518f4f4-29f1-4efa-ae3c-a847cc9f4114', 'artisan_agadir_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Agadir 2', '+212659773143', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('cf1841bc-6ec7-42e6-84bb-3bd1444ce48e', '4518f4f4-29f1-4efa-ae3c-a847cc9f4114', 'Zlayji', 'Agadir', 30.407068, -9.638578, 'Expert Zlayji à Agadir', 84, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('cf1841bc-6ec7-42e6-84bb-3bd1444ce48e');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('36753154-053b-4b07-a3cd-4451504a3009', 'artisan_agadir_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Agadir 1', '+212620996797', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('186510e6-6463-408a-b8c9-0ff48365106c', '36753154-053b-4b07-a3cd-4451504a3009', 'Sebbagh', 'Agadir', 30.435207, -9.536034, 'Expert Sebbagh à Agadir', 163, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('186510e6-6463-408a-b8c9-0ff48365106c');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('eed75434-e89b-45d2-86a6-244eedb8c0cc', 'artisan_agadir_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Agadir 2', '+212650302348', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('60930bd0-c1da-413c-9c74-aa1cfdd441d7', 'eed75434-e89b-45d2-86a6-244eedb8c0cc', 'Sebbagh', 'Agadir', 30.414444, -9.556669, 'Expert Sebbagh à Agadir', 169, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('60930bd0-c1da-413c-9c74-aa1cfdd441d7');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('d585a0df-9075-4d17-9238-4040de84fa5f', 'artisan_agadir_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Agadir 1', '+212671619673', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('0cb71efa-994c-4fda-b0f9-85c822b134d5', 'd585a0df-9075-4d17-9238-4040de84fa5f', 'Gebbas', 'Agadir', 30.429068, -9.621691, 'Expert Gebbas à Agadir', 51, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('0cb71efa-994c-4fda-b0f9-85c822b134d5');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('ce0df431-187d-4e4e-98b1-29701af62d0f', 'artisan_agadir_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Agadir 2', '+212628220381', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('0b339f82-118c-44a9-943b-a5e02d79e6c5', 'ce0df431-187d-4e4e-98b1-29701af62d0f', 'Gebbas', 'Agadir', 30.499336, -9.638492, 'Expert Gebbas à Agadir', 79, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('0b339f82-118c-44a9-943b-a5e02d79e6c5');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('ee3d2f65-f72e-4562-b087-d7c6445cac71', 'artisan_agadir_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Agadir 1', '+212656572482', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b66a3900-51b8-4035-ba37-5bb48d455e31', 'ee3d2f65-f72e-4562-b087-d7c6445cac71', 'Plombier', 'Agadir', 30.450162, -9.650988, 'Expert Plombier à Agadir', 119, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b66a3900-51b8-4035-ba37-5bb48d455e31');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('1121dbf0-6780-45ae-b145-5273a0e5a37d', 'artisan_agadir_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Agadir 2', '+212663068814', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('c8dcce72-2a3d-4644-aa44-d0ce84426f67', '1121dbf0-6780-45ae-b145-5273a0e5a37d', 'Plombier', 'Agadir', 30.36691, -9.54956, 'Expert Plombier à Agadir', 77, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('c8dcce72-2a3d-4644-aa44-d0ce84426f67');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('ac1f02c9-046c-441e-9e5f-039ee3380f6d', 'artisan_agadir_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Agadir 1', '+212654748848', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('66c04faf-bc75-48a6-b093-bacd058aea3a', 'ac1f02c9-046c-441e-9e5f-039ee3380f6d', 'Electricien', 'Agadir', 30.392672, -9.51325, 'Expert Electricien à Agadir', 170, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('66c04faf-bc75-48a6-b093-bacd058aea3a');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('58339acb-8a31-45ec-ba17-eb9a5aef23b0', 'artisan_agadir_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Agadir 2', '+212688713939', 'Agadir');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e917713c-6eb4-4a25-bd1e-dbf550c45960', '58339acb-8a31-45ec-ba17-eb9a5aef23b0', 'Electricien', 'Agadir', 30.370571, -9.58595, 'Expert Electricien à Agadir', 77, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e917713c-6eb4-4a25-bd1e-dbf550c45960');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('128f0b90-f1cb-4c09-87ef-15aab7c8d157', 'artisan_inezgane_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Inezgane 1', '+212657461844', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('a79bef07-f594-4018-8060-d83f13182d23', '128f0b90-f1cb-4c09-87ef-15aab7c8d157', 'Zlayji', 'Inezgane', 30.452136, -9.593026, 'Expert Zlayji à Inezgane', 195, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('a79bef07-f594-4018-8060-d83f13182d23');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('08a917d6-ce10-4315-93f1-1ff8a7a214ca', 'artisan_inezgane_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Inezgane 2', '+212627627828', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('590bd4f7-b1e4-4f16-95b8-bac061f83593', '08a917d6-ce10-4315-93f1-1ff8a7a214ca', 'Zlayji', 'Inezgane', 30.477918, -9.613299, 'Expert Zlayji à Inezgane', 50, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('590bd4f7-b1e4-4f16-95b8-bac061f83593');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('9f747f92-6fc4-42e5-ad0e-8c62e9ef4b03', 'artisan_inezgane_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Inezgane 1', '+212634679850', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('0a960565-e72a-48d5-9947-c1296b05f096', '9f747f92-6fc4-42e5-ad0e-8c62e9ef4b03', 'Sebbagh', 'Inezgane', 30.390514, -9.654244, 'Expert Sebbagh à Inezgane', 72, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('0a960565-e72a-48d5-9947-c1296b05f096');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('2b68bd48-0e7b-4df0-9223-4a29aeb50b07', 'artisan_inezgane_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Inezgane 2', '+212691703193', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('cee5078a-3ac6-4fc0-a810-88f89f3061b6', '2b68bd48-0e7b-4df0-9223-4a29aeb50b07', 'Sebbagh', 'Inezgane', 30.369405, -9.60949, 'Expert Sebbagh à Inezgane', 197, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('cee5078a-3ac6-4fc0-a810-88f89f3061b6');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('dbb7986d-dd50-4d01-bebc-4528b2054504', 'artisan_inezgane_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Inezgane 1', '+212689035803', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('0694def0-db9c-4570-bb0f-5876aebcbcd2', 'dbb7986d-dd50-4d01-bebc-4528b2054504', 'Gebbas', 'Inezgane', 30.437229, -9.510523, 'Expert Gebbas à Inezgane', 109, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('0694def0-db9c-4570-bb0f-5876aebcbcd2');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('3d067bfd-e979-4858-9461-6baaea71ed9e', 'artisan_inezgane_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Inezgane 2', '+212619664319', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('2c064159-c5b5-4602-859e-e14537ab8dc0', '3d067bfd-e979-4858-9461-6baaea71ed9e', 'Gebbas', 'Inezgane', 30.481433, -9.681724, 'Expert Gebbas à Inezgane', 60, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('2c064159-c5b5-4602-859e-e14537ab8dc0');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('4bc0ddaa-f3ba-4b31-9f9b-38138b4258c7', 'artisan_inezgane_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Inezgane 1', '+212626276494', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('9d0f8d92-f6c6-46e3-9d17-8264e00b5fd6', '4bc0ddaa-f3ba-4b31-9f9b-38138b4258c7', 'Plombier', 'Inezgane', 30.313134, -9.677462, 'Expert Plombier à Inezgane', 67, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('9d0f8d92-f6c6-46e3-9d17-8264e00b5fd6');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('a97222fe-0752-43c5-a0f8-ec41f68095f5', 'artisan_inezgane_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Inezgane 2', '+212684512371', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('44779245-effc-4bd2-8280-7eab347cca59', 'a97222fe-0752-43c5-a0f8-ec41f68095f5', 'Plombier', 'Inezgane', 30.3264, -9.676663, 'Expert Plombier à Inezgane', 141, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('44779245-effc-4bd2-8280-7eab347cca59');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('cdabd561-9852-4897-bfec-013b054c4a60', 'artisan_inezgane_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Inezgane 1', '+212649147809', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('50f52aa5-24b6-41dd-9d8b-e84436c4154c', 'cdabd561-9852-4897-bfec-013b054c4a60', 'Electricien', 'Inezgane', 30.487569, -9.602435, 'Expert Electricien à Inezgane', 125, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('50f52aa5-24b6-41dd-9d8b-e84436c4154c');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('eb506cf4-7949-468a-8683-8c078e9fd198', 'artisan_inezgane_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Inezgane 2', '+212674397897', 'Inezgane');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('ca212d82-273d-4ffb-a852-90f4f295b913', 'eb506cf4-7949-468a-8683-8c078e9fd198', 'Electricien', 'Inezgane', 30.373581, -9.581016, 'Expert Electricien à Inezgane', 141, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('ca212d82-273d-4ffb-a852-90f4f295b913');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('cf91deeb-9812-4874-82d0-d28ba5fcd1b2', 'artisan_aitmelloul_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Ait Melloul 1', '+212697936231', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('6eed8bb8-f14e-4740-b73b-3506401043ec', 'cf91deeb-9812-4874-82d0-d28ba5fcd1b2', 'Zlayji', 'Ait Melloul', 30.492715, -9.649386, 'Expert Zlayji à Ait Melloul', 127, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('6eed8bb8-f14e-4740-b73b-3506401043ec');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('251004ed-749c-408c-a632-7eee6888f60f', 'artisan_aitmelloul_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Ait Melloul 2', '+212619857720', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('63cef8ed-89ef-4313-b736-f795e6c8dc68', '251004ed-749c-408c-a632-7eee6888f60f', 'Zlayji', 'Ait Melloul', 30.498954, -9.54374, 'Expert Zlayji à Ait Melloul', 86, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('63cef8ed-89ef-4313-b736-f795e6c8dc68');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('41ee52b4-c545-4f72-be39-d54920973afc', 'artisan_aitmelloul_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Ait Melloul 1', '+212626822475', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('15a14996-0f5b-45ac-8622-047073e950d7', '41ee52b4-c545-4f72-be39-d54920973afc', 'Sebbagh', 'Ait Melloul', 30.333733, -9.531805, 'Expert Sebbagh à Ait Melloul', 162, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('15a14996-0f5b-45ac-8622-047073e950d7');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('1c9545d2-a6a1-4e9c-a565-7f85ad51a2c7', 'artisan_aitmelloul_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Ait Melloul 2', '+212680773854', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b317b67a-ca35-4f1d-84ba-3ede9d8960ce', '1c9545d2-a6a1-4e9c-a565-7f85ad51a2c7', 'Sebbagh', 'Ait Melloul', 30.47287, -9.698549, 'Expert Sebbagh à Ait Melloul', 109, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b317b67a-ca35-4f1d-84ba-3ede9d8960ce');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('95c91992-866e-4115-bbed-dc5732886104', 'artisan_aitmelloul_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Ait Melloul 1', '+212698753325', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('745c40df-3307-4ffd-af12-7c0b22f03349', '95c91992-866e-4115-bbed-dc5732886104', 'Gebbas', 'Ait Melloul', 30.359805, -9.608879, 'Expert Gebbas à Ait Melloul', 152, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('745c40df-3307-4ffd-af12-7c0b22f03349');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('bd8f4e4b-90f0-4db5-88ae-6d56a3bfebfb', 'artisan_aitmelloul_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Ait Melloul 2', '+212634114197', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('0929a63e-62dd-4fae-b382-4026b3c79504', 'bd8f4e4b-90f0-4db5-88ae-6d56a3bfebfb', 'Gebbas', 'Ait Melloul', 30.485737, -9.526425, 'Expert Gebbas à Ait Melloul', 109, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('0929a63e-62dd-4fae-b382-4026b3c79504');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('c60394ba-45f1-4a95-b6dd-fdbe2b7d7c6a', 'artisan_aitmelloul_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Ait Melloul 1', '+212659210417', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('51b00117-78a2-4e78-b524-136162330aa7', 'c60394ba-45f1-4a95-b6dd-fdbe2b7d7c6a', 'Plombier', 'Ait Melloul', 30.363761, -9.610419, 'Expert Plombier à Ait Melloul', 162, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('51b00117-78a2-4e78-b524-136162330aa7');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('7f4e8dc3-27eb-4623-a608-7e05c6c45ec2', 'artisan_aitmelloul_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Ait Melloul 2', '+212655753985', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('6b387f68-16ac-451d-8e22-3263b969a933', '7f4e8dc3-27eb-4623-a608-7e05c6c45ec2', 'Plombier', 'Ait Melloul', 30.48593, -9.602804, 'Expert Plombier à Ait Melloul', 175, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('6b387f68-16ac-451d-8e22-3263b969a933');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('f4a5db24-c90f-4a0c-ab92-7354cf78aa0d', 'artisan_aitmelloul_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Ait Melloul 1', '+212699195283', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('c7e0bdb2-958a-4bce-9b8a-f484959f63c6', 'f4a5db24-c90f-4a0c-ab92-7354cf78aa0d', 'Electricien', 'Ait Melloul', 30.31424, -9.644523, 'Expert Electricien à Ait Melloul', 128, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('c7e0bdb2-958a-4bce-9b8a-f484959f63c6');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('fa13c944-3ccc-4620-a4e8-27ac8fa9be71', 'artisan_aitmelloul_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Ait Melloul 2', '+212698616285', 'Ait Melloul');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('037b5a38-0f49-4b45-b6e1-701d2702c954', 'fa13c944-3ccc-4620-a4e8-27ac8fa9be71', 'Electricien', 'Ait Melloul', 30.477171, -9.573447, 'Expert Electricien à Ait Melloul', 176, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('037b5a38-0f49-4b45-b6e1-701d2702c954');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('79b171af-1222-41de-8c4e-906cef665c82', 'artisan_dcheira_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Dcheira 1', '+212631912069', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('d1f3b631-e608-4e4a-a48c-e52d33ad2104', '79b171af-1222-41de-8c4e-906cef665c82', 'Zlayji', 'Dcheira', 30.436395, -9.682068, 'Expert Zlayji à Dcheira', 181, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('d1f3b631-e608-4e4a-a48c-e52d33ad2104');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('78071cf5-fc79-4473-8335-97596e1dbe09', 'artisan_dcheira_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Dcheira 2', '+212699193868', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b566bfaf-8364-4e51-b9d3-ffc97ae0ded9', '78071cf5-fc79-4473-8335-97596e1dbe09', 'Zlayji', 'Dcheira', 30.404023, -9.601898, 'Expert Zlayji à Dcheira', 140, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b566bfaf-8364-4e51-b9d3-ffc97ae0ded9');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('2fca242e-0c7d-4afe-91c6-314d7adc52e3', 'artisan_dcheira_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Dcheira 1', '+212684450572', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('b3004749-3a17-4778-bdd2-750407a9b09b', '2fca242e-0c7d-4afe-91c6-314d7adc52e3', 'Sebbagh', 'Dcheira', 30.476138, -9.546105, 'Expert Sebbagh à Dcheira', 147, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('b3004749-3a17-4778-bdd2-750407a9b09b');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('a2123935-35c1-4af9-afdd-4f56d51bd510', 'artisan_dcheira_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Dcheira 2', '+212681956471', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('39285757-a3a1-4684-b99f-9fac615186cc', 'a2123935-35c1-4af9-afdd-4f56d51bd510', 'Sebbagh', 'Dcheira', 30.318384, -9.644801, 'Expert Sebbagh à Dcheira', 166, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('39285757-a3a1-4684-b99f-9fac615186cc');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('aaa89fc2-807b-4e20-9b4b-83115fe759e3', 'artisan_dcheira_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Dcheira 1', '+212663804380', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('24440aee-429b-4220-afd3-c2b794f3e986', 'aaa89fc2-807b-4e20-9b4b-83115fe759e3', 'Gebbas', 'Dcheira', 30.472388, -9.527811, 'Expert Gebbas à Dcheira', 187, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('24440aee-429b-4220-afd3-c2b794f3e986');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('7e62730c-8a47-4067-8d6c-354a802cf69c', 'artisan_dcheira_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Dcheira 2', '+212668461351', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('ec47fcaf-2a79-4fde-a79f-9e3a407c1d18', '7e62730c-8a47-4067-8d6c-354a802cf69c', 'Gebbas', 'Dcheira', 30.448516, -9.64687, 'Expert Gebbas à Dcheira', 182, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('ec47fcaf-2a79-4fde-a79f-9e3a407c1d18');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('9de201ec-99ac-4626-889a-eabf7de49ddc', 'artisan_dcheira_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Dcheira 1', '+212627555026', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('5f692d14-ccb6-41a9-bfa1-260e0007a345', '9de201ec-99ac-4626-889a-eabf7de49ddc', 'Plombier', 'Dcheira', 30.420113, -9.558804, 'Expert Plombier à Dcheira', 56, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('5f692d14-ccb6-41a9-bfa1-260e0007a345');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('8b3a0a87-d605-40c3-a63a-7759485d4310', 'artisan_dcheira_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Dcheira 2', '+212649937826', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('04dcf8dc-eea3-4d6a-b56e-5fbfe86f4e96', '8b3a0a87-d605-40c3-a63a-7759485d4310', 'Plombier', 'Dcheira', 30.371111, -9.635638, 'Expert Plombier à Dcheira', 80, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('04dcf8dc-eea3-4d6a-b56e-5fbfe86f4e96');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('fdab46cc-e1e0-4fa2-8a4b-4ad2092e8fd1', 'artisan_dcheira_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Dcheira 1', '+212612045141', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('4adfc1c3-16bf-4222-8952-6af773578008', 'fdab46cc-e1e0-4fa2-8a4b-4ad2092e8fd1', 'Electricien', 'Dcheira', 30.467617, -9.500823, 'Expert Electricien à Dcheira', 64, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('4adfc1c3-16bf-4222-8952-6af773578008');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('eb7a6b0e-c921-476d-8bbd-2d29e4a81a1e', 'artisan_dcheira_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Dcheira 2', '+212670130699', 'Dcheira');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('abc177f9-ec7b-4708-8b78-0f98aa4c3604', 'eb7a6b0e-c921-476d-8bbd-2d29e4a81a1e', 'Electricien', 'Dcheira', 30.440807, -9.619654, 'Expert Electricien à Dcheira', 102, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('abc177f9-ec7b-4708-8b78-0f98aa4c3604');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('4f878477-8715-410f-9076-30bef4fc8b64', 'artisan_taroudant_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Taroudant 1', '+212688799947', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('75464820-28d7-4bdc-bfe9-f9b869b37494', '4f878477-8715-410f-9076-30bef4fc8b64', 'Zlayji', 'Taroudant', 30.421486, -9.697186, 'Expert Zlayji à Taroudant', 52, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('75464820-28d7-4bdc-bfe9-f9b869b37494');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('01e738b9-ad1a-45bd-82e8-05f51e0b96bf', 'artisan_taroudant_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Taroudant 2', '+212621451072', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('8cd2ad21-464b-42e1-b77a-207d15f730f0', '01e738b9-ad1a-45bd-82e8-05f51e0b96bf', 'Zlayji', 'Taroudant', 30.499787, -9.591626, 'Expert Zlayji à Taroudant', 197, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('8cd2ad21-464b-42e1-b77a-207d15f730f0');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('7898fe25-501f-436f-8b6b-713fd5819e05', 'artisan_taroudant_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Taroudant 1', '+212653172664', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('3f2b3b5b-4d99-4494-985f-73b395886779', '7898fe25-501f-436f-8b6b-713fd5819e05', 'Sebbagh', 'Taroudant', 30.486046, -9.689872, 'Expert Sebbagh à Taroudant', 67, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('3f2b3b5b-4d99-4494-985f-73b395886779');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('33fe1b0c-c409-450c-ae0a-ced9f7f6fefa', 'artisan_taroudant_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Taroudant 2', '+212635662623', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('24db8a71-05f2-4f04-a230-779d019c82be', '33fe1b0c-c409-450c-ae0a-ced9f7f6fefa', 'Sebbagh', 'Taroudant', 30.460085, -9.598994, 'Expert Sebbagh à Taroudant', 58, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('24db8a71-05f2-4f04-a230-779d019c82be');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('96fa1919-f3e8-4109-bd87-b670b83426b5', 'artisan_taroudant_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Taroudant 1', '+212680057915', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('0002c722-84fc-4cf3-b7b4-c332128c2ab0', '96fa1919-f3e8-4109-bd87-b670b83426b5', 'Gebbas', 'Taroudant', 30.327195, -9.649505, 'Expert Gebbas à Taroudant', 120, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('0002c722-84fc-4cf3-b7b4-c332128c2ab0');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('8f07835f-3abd-41b8-8384-27c0f29b3bc3', 'artisan_taroudant_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Taroudant 2', '+212624536444', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('01fc9903-9e73-41e8-8775-c27e2d4768c2', '8f07835f-3abd-41b8-8384-27c0f29b3bc3', 'Gebbas', 'Taroudant', 30.377011, -9.517632, 'Expert Gebbas à Taroudant', 94, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('01fc9903-9e73-41e8-8775-c27e2d4768c2');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('d6bc58b7-0d41-4115-9d9f-a8ce23992d08', 'artisan_taroudant_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Taroudant 1', '+212666638638', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('c79af369-0fca-4488-91f8-767433034ac1', 'd6bc58b7-0d41-4115-9d9f-a8ce23992d08', 'Plombier', 'Taroudant', 30.40509, -9.532285, 'Expert Plombier à Taroudant', 181, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('c79af369-0fca-4488-91f8-767433034ac1');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('69cc841c-b913-4625-acf7-704a4d608902', 'artisan_taroudant_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Taroudant 2', '+212630679944', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('7d6b2481-c701-4ec5-a57a-3889a954699c', '69cc841c-b913-4625-acf7-704a4d608902', 'Plombier', 'Taroudant', 30.351189, -9.541501, 'Expert Plombier à Taroudant', 77, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('7d6b2481-c701-4ec5-a57a-3889a954699c');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('f73212d7-c47b-40b3-9c48-38224d566f23', 'artisan_taroudant_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Taroudant 1', '+212625592874', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e478297f-9751-4730-af17-cccb8baecb86', 'f73212d7-c47b-40b3-9c48-38224d566f23', 'Electricien', 'Taroudant', 30.305143, -9.585289, 'Expert Electricien à Taroudant', 74, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e478297f-9751-4730-af17-cccb8baecb86');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('cb431f43-fe33-4c8e-9f37-cd256bcf5c52', 'artisan_taroudant_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Taroudant 2', '+212676813964', 'Taroudant');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e3c31c9f-5f59-40b7-965f-d859e3257a23', 'cb431f43-fe33-4c8e-9f37-cd256bcf5c52', 'Electricien', 'Taroudant', 30.484465, -9.69892, 'Expert Electricien à Taroudant', 175, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e3c31c9f-5f59-40b7-965f-d859e3257a23');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('87db1f62-38bf-4afe-94c1-e77d2688bae2', 'artisan_tiznit_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Tiznit 1', '+212656316161', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('67afc003-0723-4a83-9e08-bc6e0ef4bdc0', '87db1f62-38bf-4afe-94c1-e77d2688bae2', 'Zlayji', 'Tiznit', 30.344146, -9.564436, 'Expert Zlayji à Tiznit', 106, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('67afc003-0723-4a83-9e08-bc6e0ef4bdc0');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('90aee36f-77ed-4434-84d5-4077a9aca3bc', 'artisan_tiznit_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Tiznit 2', '+212696459445', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('2158fc9b-7231-454c-9568-f9c16cf92dee', '90aee36f-77ed-4434-84d5-4077a9aca3bc', 'Zlayji', 'Tiznit', 30.482051, -9.646643, 'Expert Zlayji à Tiznit', 71, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('2158fc9b-7231-454c-9568-f9c16cf92dee');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('7fda2f18-6f41-4b5b-a375-43e42fb9a00c', 'artisan_tiznit_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Tiznit 1', '+212646663723', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('2a838aba-023e-4a23-9c28-fedd1209f560', '7fda2f18-6f41-4b5b-a375-43e42fb9a00c', 'Sebbagh', 'Tiznit', 30.315888, -9.5894, 'Expert Sebbagh à Tiznit', 151, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('2a838aba-023e-4a23-9c28-fedd1209f560');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('149545b3-c498-4eed-9d9d-ab03868a28af', 'artisan_tiznit_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Tiznit 2', '+212686316746', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('04c00c0f-9793-458c-b1ff-83764d02b6e2', '149545b3-c498-4eed-9d9d-ab03868a28af', 'Sebbagh', 'Tiznit', 30.453025, -9.546802, 'Expert Sebbagh à Tiznit', 194, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('04c00c0f-9793-458c-b1ff-83764d02b6e2');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('477a0f44-d70a-45c2-90f3-03d9bd5a268e', 'artisan_tiznit_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Tiznit 1', '+212662588023', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('dd156ac8-5e2a-4be8-9cf6-83ca8345e2e5', '477a0f44-d70a-45c2-90f3-03d9bd5a268e', 'Gebbas', 'Tiznit', 30.497558, -9.62576, 'Expert Gebbas à Tiznit', 70, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('dd156ac8-5e2a-4be8-9cf6-83ca8345e2e5');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('0dda6b9d-fe17-4a7b-94a4-a965ab2de433', 'artisan_tiznit_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Tiznit 2', '+212620025305', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('4c3d30f1-a743-475f-864e-fe0855b1c553', '0dda6b9d-fe17-4a7b-94a4-a965ab2de433', 'Gebbas', 'Tiznit', 30.305487, -9.556643, 'Expert Gebbas à Tiznit', 169, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('4c3d30f1-a743-475f-864e-fe0855b1c553');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('31fc651a-85c4-4c76-a638-b063858359d4', 'artisan_tiznit_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Tiznit 1', '+212628357836', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('935e4e10-73f1-45a4-b4df-bccc41398f1c', '31fc651a-85c4-4c76-a638-b063858359d4', 'Plombier', 'Tiznit', 30.487256, -9.659007, 'Expert Plombier à Tiznit', 183, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('935e4e10-73f1-45a4-b4df-bccc41398f1c');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('47bee7d4-344e-4f76-b1d2-71bf78f337df', 'artisan_tiznit_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Tiznit 2', '+212627219706', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('a5165cb1-3407-4615-a6a4-a8b9e8506984', '47bee7d4-344e-4f76-b1d2-71bf78f337df', 'Plombier', 'Tiznit', 30.430912, -9.548054, 'Expert Plombier à Tiznit', 193, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('a5165cb1-3407-4615-a6a4-a8b9e8506984');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('a78a5b99-016e-408d-97ed-c08bff85827d', 'artisan_tiznit_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Tiznit 1', '+212629856946', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('fe8d9ae7-4b45-4474-8eaf-3ce4755924a6', 'a78a5b99-016e-408d-97ed-c08bff85827d', 'Electricien', 'Tiznit', 30.412968, -9.673427, 'Expert Electricien à Tiznit', 111, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('fe8d9ae7-4b45-4474-8eaf-3ce4755924a6');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('15556fa5-93ac-45f9-9f86-26046e263bde', 'artisan_tiznit_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Tiznit 2', '+212676468974', 'Tiznit');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('90e9a273-24c3-4f3c-9150-c8f22b1b7992', '15556fa5-93ac-45f9-9f86-26046e263bde', 'Electricien', 'Tiznit', 30.447785, -9.64739, 'Expert Electricien à Tiznit', 68, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('90e9a273-24c3-4f3c-9150-c8f22b1b7992');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('fe95d91c-3d1d-40a7-8f08-a001a376604e', 'artisan_tata_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Tata 1', '+212650344442', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('d0db5d65-5d5d-41fd-8954-997bafc23956', 'fe95d91c-3d1d-40a7-8f08-a001a376604e', 'Zlayji', 'Tata', 30.30277, -9.621154, 'Expert Zlayji à Tata', 130, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('d0db5d65-5d5d-41fd-8954-997bafc23956');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('32671581-ed9e-4f64-8317-7b10e10dbb0d', 'artisan_tata_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Tata 2', '+212611549337', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('2d9c0152-fa36-456f-bef5-77881832fcde', '32671581-ed9e-4f64-8317-7b10e10dbb0d', 'Zlayji', 'Tata', 30.380199, -9.623299, 'Expert Zlayji à Tata', 134, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('2d9c0152-fa36-456f-bef5-77881832fcde');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('1e371778-e616-4c69-b86b-7e29dbf4869c', 'artisan_tata_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Tata 1', '+212619356818', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('65b46be9-bc40-4143-8a8a-4ed82ff22418', '1e371778-e616-4c69-b86b-7e29dbf4869c', 'Sebbagh', 'Tata', 30.328949, -9.621184, 'Expert Sebbagh à Tata', 97, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('65b46be9-bc40-4143-8a8a-4ed82ff22418');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('6e61b36d-d309-4664-89e2-85fd9c979fba', 'artisan_tata_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Tata 2', '+212637103852', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('739f8bda-f6a8-4146-92a5-818b1fd70684', '6e61b36d-d309-4664-89e2-85fd9c979fba', 'Sebbagh', 'Tata', 30.40454, -9.628397, 'Expert Sebbagh à Tata', 68, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('739f8bda-f6a8-4146-92a5-818b1fd70684');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('a43e4fdb-4470-4e89-a0f8-49a114fd997d', 'artisan_tata_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Tata 1', '+212632596042', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e7f652ad-b284-4e9f-a7b1-78435d5d9d3c', 'a43e4fdb-4470-4e89-a0f8-49a114fd997d', 'Gebbas', 'Tata', 30.371956, -9.630111, 'Expert Gebbas à Tata', 84, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e7f652ad-b284-4e9f-a7b1-78435d5d9d3c');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('5a093627-068a-44ae-8898-a4d2219563bc', 'artisan_tata_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Tata 2', '+212674501941', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('f9446277-829e-4933-bfe9-4079f0939763', '5a093627-068a-44ae-8898-a4d2219563bc', 'Gebbas', 'Tata', 30.312209, -9.506921, 'Expert Gebbas à Tata', 68, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('f9446277-829e-4933-bfe9-4079f0939763');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('7fbd40c9-35e9-4fb2-b6e3-2ba4a1b92f8e', 'artisan_tata_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Tata 1', '+212699302917', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('1806196a-34f6-43e9-8a81-672f178fcf93', '7fbd40c9-35e9-4fb2-b6e3-2ba4a1b92f8e', 'Plombier', 'Tata', 30.439309, -9.612241, 'Expert Plombier à Tata', 179, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('1806196a-34f6-43e9-8a81-672f178fcf93');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('e8e3f01a-98be-4277-a01a-204c0c148bf8', 'artisan_tata_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Tata 2', '+212684994370', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('49005c17-8457-4501-ae94-de06ac01ca9a', 'e8e3f01a-98be-4277-a01a-204c0c148bf8', 'Plombier', 'Tata', 30.405741, -9.563412, 'Expert Plombier à Tata', 87, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('49005c17-8457-4501-ae94-de06ac01ca9a');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('9f8391df-a96d-47bd-9432-6b0725b093f3', 'artisan_tata_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Tata 1', '+212642384406', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('d9239f28-aa70-4c26-8638-a5c2929d6cce', '9f8391df-a96d-47bd-9432-6b0725b093f3', 'Electricien', 'Tata', 30.318152, -9.66661, 'Expert Electricien à Tata', 136, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('d9239f28-aa70-4c26-8638-a5c2929d6cce');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('234c386d-04cf-4e45-8376-f2cad1a2c760', 'artisan_tata_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Tata 2', '+212666826897', 'Tata');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('366e3540-7e91-4d65-bfaf-eea3294dec7f', '234c386d-04cf-4e45-8376-f2cad1a2c760', 'Electricien', 'Tata', 30.482755, -9.573308, 'Expert Electricien à Tata', 187, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('366e3540-7e91-4d65-bfaf-eea3294dec7f');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('263ef4e6-b724-4afd-8915-89812b0b640c', 'artisan_chtoukaaitbaha_zlayji_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Chtouka Ait Baha 1', '+212697991038', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('6b12b4bb-5cc6-43bd-b1ab-2fd74454fd3d', '263ef4e6-b724-4afd-8915-89812b0b640c', 'Zlayji', 'Chtouka Ait Baha', 30.381344, -9.69666, 'Expert Zlayji à Chtouka Ait Baha', 184, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('6b12b4bb-5cc6-43bd-b1ab-2fd74454fd3d');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('7ee1f37a-7380-4df3-96e2-15f08134afb6', 'artisan_chtoukaaitbaha_zlayji_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Zlayji Chtouka Ait Baha 2', '+212623695949', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('2eb9b7a8-adfb-4365-9475-59ac0cc0b445', '7ee1f37a-7380-4df3-96e2-15f08134afb6', 'Zlayji', 'Chtouka Ait Baha', 30.368123, -9.666905, 'Expert Zlayji à Chtouka Ait Baha', 169, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('2eb9b7a8-adfb-4365-9475-59ac0cc0b445');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('279bcb99-ae5a-47c9-b167-937f47d9eef8', 'artisan_chtoukaaitbaha_sebbagh_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Chtouka Ait Baha 1', '+212669039945', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('0b0835e8-55a8-4e58-a2db-9ba395bac719', '279bcb99-ae5a-47c9-b167-937f47d9eef8', 'Sebbagh', 'Chtouka Ait Baha', 30.463931, -9.541224, 'Expert Sebbagh à Chtouka Ait Baha', 119, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('0b0835e8-55a8-4e58-a2db-9ba395bac719');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('ae36525c-0108-4645-a716-b2b7408aed3f', 'artisan_chtoukaaitbaha_sebbagh_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Sebbagh Chtouka Ait Baha 2', '+212678978690', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('0a799277-f0f0-4a4d-9919-51fa847ee80b', 'ae36525c-0108-4645-a716-b2b7408aed3f', 'Sebbagh', 'Chtouka Ait Baha', 30.390637, -9.503187, 'Expert Sebbagh à Chtouka Ait Baha', 194, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('0a799277-f0f0-4a4d-9919-51fa847ee80b');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('917c7abd-b83c-405c-a2c0-d9ebafccc535', 'artisan_chtoukaaitbaha_gebbas_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Chtouka Ait Baha 1', '+212693304094', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('8a3d5d38-86c5-4d94-9bfd-f6bb3949faff', '917c7abd-b83c-405c-a2c0-d9ebafccc535', 'Gebbas', 'Chtouka Ait Baha', 30.322376, -9.642162, 'Expert Gebbas à Chtouka Ait Baha', 90, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('8a3d5d38-86c5-4d94-9bfd-f6bb3949faff');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('c563bab7-6f75-44e1-a666-d4cf29b251fc', 'artisan_chtoukaaitbaha_gebbas_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Gebbas Chtouka Ait Baha 2', '+212669723867', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('ce4edb23-600e-4c5a-a80b-9c27da59b22e', 'c563bab7-6f75-44e1-a666-d4cf29b251fc', 'Gebbas', 'Chtouka Ait Baha', 30.372193, -9.57588, 'Expert Gebbas à Chtouka Ait Baha', 116, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('ce4edb23-600e-4c5a-a80b-9c27da59b22e');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('c3251ea6-cda8-40d8-a0dc-f8e2e399861b', 'artisan_chtoukaaitbaha_plombier_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Chtouka Ait Baha 1', '+212661033435', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('e02150c9-8023-4644-b2cd-e4d393421e10', 'c3251ea6-cda8-40d8-a0dc-f8e2e399861b', 'Plombier', 'Chtouka Ait Baha', 30.46621, -9.512709, 'Expert Plombier à Chtouka Ait Baha', 145, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('e02150c9-8023-4644-b2cd-e4d393421e10');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('d2f0f113-f275-41ea-b5b6-de4f7a822323', 'artisan_chtoukaaitbaha_plombier_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Plombier Chtouka Ait Baha 2', '+212682889060', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('750506bf-fe2b-41c8-8fd5-40ffeeaa6758', 'd2f0f113-f275-41ea-b5b6-de4f7a822323', 'Plombier', 'Chtouka Ait Baha', 30.483823, -9.577576, 'Expert Plombier à Chtouka Ait Baha', 168, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('750506bf-fe2b-41c8-8fd5-40ffeeaa6758');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('a69f9336-a632-4849-b549-a4f81868648f', 'artisan_chtoukaaitbaha_electricien_1@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Chtouka Ait Baha 1', '+212659931040', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('831e4332-d7bf-44d3-9b00-e275fbeb8db8', 'a69f9336-a632-4849-b549-a4f81868648f', 'Electricien', 'Chtouka Ait Baha', 30.398753, -9.500061, 'Expert Electricien à Chtouka Ait Baha', 119, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('831e4332-d7bf-44d3-9b00-e275fbeb8db8');

INSERT INTO profiles (id, email, password_hash, role, full_name, phone, city) VALUES ('f8eb3e02-d6a1-4881-9c9c-c1cf70d5ff43', 'artisan_chtoukaaitbaha_electricien_2@example.com', '$2b$12$5Gw2CSQL2PVNItNSkttqK.nuSMnqRjufAc610hnSu51p32RMU8xei', 'worker', 'Electricien Chtouka Ait Baha 2', '+212688253099', 'Chtouka Ait Baha');
INSERT INTO artisans (id, user_id, profession, city, latitude, longitude, description, base_hourly_rate_mad, is_available) VALUES ('ae51ae98-22b3-49b7-b73b-6ffba306310d', 'f8eb3e02-d6a1-4881-9c9c-c1cf70d5ff43', 'Electricien', 'Chtouka Ait Baha', 30.491175, -9.607655, 'Expert Electricien à Chtouka Ait Baha', 129, true);
INSERT INTO artisan_stats (artisan_id) VALUES ('ae51ae98-22b3-49b7-b73b-6ffba306310d');
