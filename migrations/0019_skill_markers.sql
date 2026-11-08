-- Skills part of platform migration 0019 (D202): four more categories and Web3 skills.
-- Job and candidate marker columns stay in the platform.

ALTER TABLE public.skills DROP CONSTRAINT IF EXISTS skills_category_check;
ALTER TABLE public.skills
  ADD CONSTRAINT skills_category_check CHECK (
    category IN (
      'engineering', 'data', 'design', 'product', 'marketing', 'sales',
      'support', 'operations', 'finance', 'hr', 'legal', 'content',
      'community', 'research'
    )
  );

-- skills and skills_aliases have FORCE ROW LEVEL SECURITY (enable_rls_deny_all),
-- so even their owner is filtered; the cloud migration role is not a superuser.
-- Lift FORCE for the seed and restore it in the same transaction (D215).
ALTER TABLE public.skills NO FORCE ROW LEVEL SECURITY;
ALTER TABLE public.skills_aliases NO FORCE ROW LEVEL SECURITY;

INSERT INTO public.skills (slug, name_en, name_ru, category) VALUES
  ('solidity', 'Solidity', 'Solidity', 'engineering'),
  ('smartcontracts', 'Smart Contracts', 'Смарт-контракты', 'engineering'),
  ('zkproofs', 'Zero-Knowledge Proofs', 'ZK-доказательства', 'engineering'),
  ('substrate', 'Substrate', 'Substrate', 'engineering'),
  ('evm', 'EVM', 'EVM', 'engineering'),
  ('anchor', 'Anchor', 'Anchor (Solana)', 'engineering'),
  ('web3js', 'web3.js', 'web3.js / ethers.js', 'engineering'),
  ('ios', 'iOS', 'iOS', 'engineering'),
  ('django', 'Django', 'Django', 'engineering'),
  ('rubyonrails', 'Ruby on Rails', 'Ruby on Rails', 'engineering'),
  ('sre', 'Site Reliability Engineering', 'SRE', 'engineering'),
  ('fullstack', 'Full-stack', 'Фулстек', 'engineering'),
  ('technicalwriting', 'Technical Writing', 'Техническое письмо', 'content'),
  ('translation', 'Translation', 'Переводы', 'content'),
  ('contentwriting', 'Content Writing', 'Контент', 'content'),
  ('memes', 'Meme Marketing', 'Мемы', 'marketing'),
  ('eventmarketing', 'Event Marketing', 'Ивент-маркетинг', 'marketing'),
  ('communitymanagement', 'Community Management', 'Комьюнити-менеджмент', 'community'),
  ('devrel', 'Developer Relations', 'DevRel', 'community'),
  ('compliance', 'Compliance', 'Комплаенс', 'legal'),
  ('aml', 'AML / KYC', 'AML / KYC', 'legal'),
  ('cryptolaw', 'Crypto Law', 'Крипто-право', 'legal'),
  ('tokenomics', 'Tokenomics', 'Токеномика', 'research'),
  ('economics', 'Economics', 'Экономика', 'research'),
  ('quant', 'Quantitative Analysis', 'Квант-анализ', 'research'),
  ('trading', 'Trading', 'Трейдинг', 'research'),
  ('venturecapital', 'Venture Capital', 'Венчур', 'research'),
  ('dataanalysis', 'Data Analysis', 'Анализ данных', 'data')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.skills_aliases (alias_normalized, skill_id)
SELECT v.alias_normalized, s.id
FROM (VALUES
  ('solidity', 'solidity'),
  ('sol', 'solidity'),
  ('smartcontracts', 'smartcontracts'),
  ('smartcontract', 'smartcontracts'),
  ('zkproofs', 'zkproofs'),
  ('zeroknowledgeproofs', 'zkproofs'),
  ('zk', 'zkproofs'),
  ('zeroknowledge', 'zkproofs'),
  ('zkp', 'zkproofs'),
  ('zksnarks', 'zkproofs'),
  ('substrate', 'substrate'),
  ('polkadotsdk', 'substrate'),
  ('evm', 'evm'),
  ('ethereumvirtualmachine', 'evm'),
  ('anchor', 'anchor'),
  ('solanaanchor', 'anchor'),
  ('web3js', 'web3js'),
  ('web3', 'web3js'),
  ('ethers', 'web3js'),
  ('ios', 'ios'),
  ('swift', 'ios'),
  ('swiftui', 'ios'),
  ('django', 'django'),
  ('djangorest', 'django'),
  ('rubyonrails', 'rubyonrails'),
  ('rails', 'rubyonrails'),
  ('ror', 'rubyonrails'),
  ('sre', 'sre'),
  ('sitereliability', 'sre'),
  ('sitereliabilityengineering', 'sre'),
  ('fullstack', 'fullstack'),
  ('fullstackdeveloper', 'fullstack'),
  ('technicalwriting', 'technicalwriting'),
  ('technicalwriter', 'technicalwriting'),
  ('docs', 'technicalwriting'),
  ('translation', 'translation'),
  ('translator', 'translation'),
  ('localization', 'translation'),
  ('contentwriting', 'contentwriting'),
  ('contentwriter', 'contentwriting'),
  ('memes', 'memes'),
  ('meme', 'memes'),
  ('mememarketing', 'memes'),
  ('eventmarketing', 'eventmarketing'),
  ('events', 'eventmarketing'),
  ('communitymanagement', 'communitymanagement'),
  ('communitymanager', 'communitymanagement'),
  ('discord', 'communitymanagement'),
  ('devrel', 'devrel'),
  ('developeradvocate', 'devrel'),
  ('compliance', 'compliance'),
  ('regulatory', 'compliance'),
  ('aml', 'aml'),
  ('amlkyc', 'aml'),
  ('antimoneylaundering', 'aml'),
  ('kyc', 'aml'),
  ('cryptolaw', 'cryptolaw'),
  ('cryptoregulation', 'cryptolaw'),
  ('tokenomics', 'tokenomics'),
  ('tokeneconomics', 'tokenomics'),
  ('economics', 'economics'),
  ('economist', 'economics'),
  ('quant', 'quant'),
  ('quantitativeanalysis', 'quant'),
  ('trading', 'trading'),
  ('marketmaking', 'trading'),
  ('venturecapital', 'venturecapital'),
  ('vc', 'venturecapital'),
  ('dataanalysis', 'dataanalysis'),
  ('dataanalyst', 'dataanalysis')
) AS v(alias_normalized, slug)
JOIN public.skills s ON s.slug = v.slug
ON CONFLICT (alias_normalized) DO NOTHING;

ALTER TABLE public.skills FORCE ROW LEVEL SECURITY;
ALTER TABLE public.skills_aliases FORCE ROW LEVEL SECURITY;
