-- =============================================
-- Tools for: tools search frontend testing (POST /tools/search)
-- =============================================
INSERT INTO tools (id, name, url, status, active_en, active_fr)
VALUES
  ('c1000000-0000-4000-8000-000000000001', 'Plunk', 'https://www.useplunk.com/', 'sponsored', TRUE, TRUE),
  ('c1000000-0000-4000-8000-000000000002', 'Twilio', 'https://www.twilio.com/', '', TRUE, TRUE),
  ('c1000000-0000-4000-8000-000000000003', 'Loops', 'https://loops.so/', '', TRUE, TRUE),
  ('c1000000-0000-4000-8000-000000000004', 'Legalstart', 'https://www.legalstart.fr/', '', FALSE, TRUE),
  ('c1000000-0000-4000-8000-000000000005', 'LegalPlace', 'https://www.legalplace.fr/', '', FALSE, TRUE),
  ('c1000000-0000-4000-8000-000000000006', 'Gumroad', 'https://gumroad.com/', '', TRUE, TRUE),
  ('c1000000-0000-4000-8000-000000000007', 'Payhip', 'https://payhip.com/', '', TRUE, TRUE),
  ('c1000000-0000-4000-8000-000000000008', 'Shopify', 'https://shopify.com/', '', TRUE, TRUE),
  ('c1000000-0000-4000-8000-000000000009', 'Amazon Web Services (AWS)', 'https://aws.amazon.com/', '', TRUE, TRUE);

-- =============================================
-- Tags for: tools search frontend testing (POST /tools/search)
-- =============================================
INSERT INTO tags (id, label_en, slug_en, label_fr, slug_fr, type, sponsored_tool_id)
VALUES
  ('c2000000-0000-4000-8000-000000000001', 'Send transactional emails', 'transactional-emails', 'Envoyer des emails transactionnels', 'emails-transactionnels', 'goal', 'c1000000-0000-4000-8000-000000000001'),
  ('c2000000-0000-4000-8000-000000000002', '', '', 'Créer une entreprise en France', 'creation-entreprise-france', 'goal', NULL),
  ('c2000000-0000-4000-8000-000000000003', 'Sell digital products', 'sell-digital-products', 'Vendre des produits digitaux', 'vendre-produits-digitaux', 'goal', NULL),
  ('c2000000-0000-4000-8000-000000000004', 'Sell physical products', 'sell-physical-products', 'Vendre des produits physiques', 'vendre-produits-physiques', 'goal', NULL),
  ('c2000000-0000-4000-8000-000000000005', 'For developers', 'for-developers', 'Pour les développeurs', 'pour-developpeurs', 'target', NULL);

-- =============================================
-- Tool–tag links for: tools search frontend testing
-- Each tool has at least one tag (required by the search query)
-- =============================================
INSERT INTO tool_tags (id, tool_id, tag_id, tool_specific_url, tool_specific_name)
VALUES
  ('c3000000-0000-4000-8000-000000000001', 'c1000000-0000-4000-8000-000000000001', 'c2000000-0000-4000-8000-000000000001', '', ''),
  ('c3000000-0000-4000-8000-000000000002', 'c1000000-0000-4000-8000-000000000002', 'c2000000-0000-4000-8000-000000000001', '', ''),
  ('c3000000-0000-4000-8000-000000000003', 'c1000000-0000-4000-8000-000000000003', 'c2000000-0000-4000-8000-000000000001', '', ''),
  ('c3000000-0000-4000-8000-000000000004', 'c1000000-0000-4000-8000-000000000004', 'c2000000-0000-4000-8000-000000000002', '', ''),
  ('c3000000-0000-4000-8000-000000000005', 'c1000000-0000-4000-8000-000000000005', 'c2000000-0000-4000-8000-000000000002', '', ''),
  ('c3000000-0000-4000-8000-000000000006', 'c1000000-0000-4000-8000-000000000006', 'c2000000-0000-4000-8000-000000000003', '', ''),
  ('c3000000-0000-4000-8000-000000000007', 'c1000000-0000-4000-8000-000000000007', 'c2000000-0000-4000-8000-000000000003', '', ''),
  ('c3000000-0000-4000-8000-000000000008', 'c1000000-0000-4000-8000-000000000008', 'c2000000-0000-4000-8000-000000000003', '', ''),
  ('c3000000-0000-4000-8000-000000000009', 'c1000000-0000-4000-8000-000000000008', 'c2000000-0000-4000-8000-000000000004', '', ''),
  ('c3000000-0000-4000-8000-000000000010', 'c1000000-0000-4000-8000-000000000003', 'c2000000-0000-4000-8000-000000000005', '', ''),
  ('c3000000-0000-4000-8000-000000000011', 'c1000000-0000-4000-8000-000000000009', 'c2000000-0000-4000-8000-000000000001', 'https://aws.amazon.com/ses/', 'Amazon Simple Email Service (SES)');
