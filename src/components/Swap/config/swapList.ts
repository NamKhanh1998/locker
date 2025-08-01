import { keyBy, orderBy } from 'lodash'

export const SwapTokensList: Array<any> = [
  {
    coingeckoId: 'sui',
    symbol: 'SUI',
    name: 'Sui',
    address: '0x2::sui::SUI',
    pairAddress:
      '0x5eb2dfcdd1b15d2021328258f6d5ec081e9a0cdcfa9e13a0eaeb9b5f7505ca78',
    website: 'https://sui.io/',
    twitter: 'https://x.com/SuiNetwork',
    telegram: '',
    decimals: 9,
    narratives: ['Others'],
  },

  {
    address:
      '0x145e6f90d261dc18a591b6127f5ebd56803812d4ee1852da0154d4c400828096::bubo::BUBO',
    coingeckoId: '',
    pairAddress:
      '0xf0620fb9b64f53d78b96955154ab78367b640604355524e008367b14b05fcf87',
    website: 'https://www.bubbo.fun/',
    twitter: 'https://x.com/bubbofun',
    telegram: 'https://t.me/bubbofunn',
    logoUrl: '',
    name: 'Bubbo',
    symbol: 'BUBO',
    decimals: 6,
    narratives: ['DeFi'],
    new: true,
  },

  {
    coingeckoId: '',
    symbol: 'USDC',
    name: 'Native USDC',
    address:
      '0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC',
    pairAddress:
      '0xb8d7d9e66a60c239e7a60110efcf8de6c705580ed924d0dde141f4a0e2c90105',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 6,
  },
  {
    coingeckoId: 'aaa-cat',
    symbol: 'AAA',
    name: 'aaa cat',
    address:
      '0xd976fda9a9786cda1a36dee360013d775a5e5f206f8e20f84fad3385e99eeb2d::aaa::AAA',
    pairAddress:
      '0xefb505bc94eb6635f256f4478d9846b4ce6e963f14357b2bd2f1b08bf011ee5b',
    website: 'https://aaacatsui.com/',
    twitter: 'https://x.com/aaaCatSui',
    telegram: 'https://t.me/aaaCatSui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0x0d19c13abd1c58308c04bc54c884a49d06dc7e49242d5f123c3c136db264e9e6::aki::AKI',
    coingeckoId: '',
    pairAddress:
      '0x062c4d30f7259c233ddf37668c3317abaee1cd86f4cc9ff7e5826afa2a5e5799',
    website: 'https://akikun.xyz/',
    twitter: 'https://x.com/Akikun_sui',
    telegram: 'https://t.me/AkiKun_Sui',
    logoUrl: '',
    name: 'AKI Kun',
    symbol: 'AKI',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'aida',
    symbol: 'AIDA',
    name: 'AIDA',
    address:
      '0x57e93adcecd97fc8b30fc6f124be185f292b648e324773d8fbe6650e8274790f::aida::AIDA',
    pairAddress:
      '0xf60b75ace6bf73ddec04cc06aa73fceed01c448a9b36a14830f359ffeb230c61',
    website: 'https://www.aida-sui.com/',
    twitter: 'https://x.com/Aida_Sui',
    telegram: 'https://t.me/Aida_Ai_Sui',
    decimals: 6,
    narratives: ['AI'],
  },
  {
    coingeckoId: 'alpha-fi',
    symbol: 'ALPHA',
    name: 'Alpha Fi',
    address:
      '0xfe3afec26c59e874f3c1d60b8203cb3852d2bb2aa415df9548b8d688e6683f93::alpha::ALPHA',
    pairAddress:
      '0x9e27881eb1565d35277824369172e0921743321eb49b14bf962867e345dea49a',
    website: 'https://alphafi.xyz/',
    twitter: 'https://x.com/AlphaFiSUI',
    telegram: 'https://t.me/AlphaFiSUI',
    decimals: 9,
    narratives: ['DeFi'],
  },

  {
    coingeckoId: 'artfi',
    symbol: 'ARTFI',
    name: 'ARTFI',
    address:
      '0x706fa7723231e13e8d37dad56da55c027f3163094aa31c867ca254ba0e0dc79f::artfi::ARTFI',
    pairAddress:
      '0x5fc8de3d91652c61771b34e4aa7dce9d8fd8d837e06b465ef2df9b1d7741aa8b',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    coingeckoId: '',
    symbol: 'AXOL',
    name: 'AXOL',
    address:
      '0xf00eb7ab086967a33c04a853ad960e5c6b0955ef5a47d50b376d83856dc1215e::axol::AXOL',
    pairAddress:
      '0xde265ef8645c680c71b33805de77ce5261a20c58397d83b3915bdbb3a7209d7e',
    website: 'https://www.axolcoin.xyz/',
    twitter: 'https://x.com/Axolonsui',
    telegram: 'https://t.me/AxolSui',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0x035d31053da220c12e196b053fe1cd20ee635001d8c81dce7a3f14e9c583713c::ballsy::BALLSY',
    coingeckoId: '',
    pairAddress:
      '0x9ac28369289dca759311bf4dbf82fe1b9a567b591d840536154d25023e57ace2',
    website: '',
    twitter: 'https://x.com/ballsyonsui',
    telegram: 'https://t.me/BALLSYonSUI',
    logoUrl: '',
    name: 'Ballsy on Sui',
    symbol: 'BALLSY',
    decimals: 9,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'babylofi',
    symbol: 'BABYLOFI',
    name: 'BabyLofi',
    address:
      '0x1e8f1b2d8ccb15f78562ab6ed05fc477d58f9cd46a355d13fbcc2f9a7ce27023::babylofi::BABYLOFI',
    pairAddress:
      '0x31454c2d723ac203cccda8597ef458347e2b996770667a407e246673a8bb201c',
    website: 'https://babylofionsui.web.app/',
    twitter: 'https://x.com/babylofitheyeti',
    telegram: 'https://t.me/BabyLofiOnSUI',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'baby-axol',
    symbol: 'bbAXOL',
    name: 'Baby Axol',
    address:
      '0x6a04d15df13185ea25526c7afe550581fe73435e3e4e00cbd7f857871d3e1897::bbaxol::BBAXOL',
    pairAddress:
      '0x61254f98107b1267cc0f3a4864c7c8cdf91bf266889b1ec7562bd6fe6b55366d',
    website: 'https://babyaxol.xyz/',
    twitter: 'https://x.com/bbaxol_',
    telegram: 'https://t.me/BBAxol_on_Sui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0xb81b84d91ea2dd7ded2825c999e8ee6b8ead1b23cb6b9ea475cc6e405a68609f::bloop::BLOOP',
    coingeckoId: '',
    pairAddress:
      '0x25e7b858615bbdf69b898b1929f46a4aee75b6831122d3a97dfb91c6a9269275',
    twitter: 'https://x.com/blooponsui',
    telegram: 'https://t.me/BloopOnSuiPortal',
    website: '',
    logoUrl: '',
    name: 'Bloop On Sui',
    symbol: 'BLOOP',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0xb0254143cfb31c310b7950276cbf7f929833504ef6537f42d733eddc49a9489d::bears::BEARS',
    coingeckoId: '',
    pairAddress:
      '0x95ab2b23510a9a66e62cbd9b5a73b4544352b5ab50f3a514202416256a3602c5',
    website: 'https://www.pandasui.com/bears.html',
    twitter: 'https://x.com/0xPandaSui',
    telegram: 'https://t.me/PandaSuiCoin/16175',
    logoUrl: '',
    name: 'Bear Sui',
    symbol: 'BearS',
    decimals: 9,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'beeg-blue-whale',
    symbol: 'BEEG',
    name: 'Beeg Blue Whale',
    address:
      '0x727458212ca0be056d9ccc0d42981bdf41109779fbd9c7fad56c4456e0c3d0c6::beeg::BEEG',
    pairAddress:
      '0x2bbb3ba0e7632bc2ca3b2bc986583be335ed539f95101b4c34d65c91e09dcfc1',
    website: 'https://beegblue.xyz/',
    twitter: 'https://x.com/BeegBlue',
    telegram: 'https://t.me/BeegBlueWhale',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'blub',
    symbol: 'BLUB',
    name: 'BLUB',
    address:
      '0xfa7ac3951fdca92c5200d468d31a365eb03b2be9936fde615e69f0c1274ad3a0::BLUB::BLUB',
    pairAddress:
      '0x40a372f9ee1989d76ceb8e50941b04468f8551d091fb8a5d7211522e42e60aaf',
    website: 'https://blubsui.com',
    twitter: 'https://x.com/blubsui',
    telegram: 'https://t.me/blubsui',
    decimals: 2,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'blubia',
    symbol: 'BLUBIA',
    name: 'Blubia',
    address:
      '0x3c524ee86d6a655dc199f50c5fc69af4d4eb75fae5901f5756b0436a31681c61::blubia::BLUBIA',
    pairAddress:
      '0x1c9fd57808b4a28b6a1008045fee8b4220810822872139ec7530141b82c3f595',
    website: 'https://blubiacto.com/',
    twitter: 'https://x.com/blubiatoken',
    telegram: 'https://t.me/BlubiaToken',
    decimals: 6,
    narratives: ['Others'],
  },
  {
    coingeckoId: 'bluefin',
    symbol: 'BLUE',
    name: 'Bluefin',
    address:
      '0xe1b45a0e641b9955a20aa0ad1c1f4ad86aad8afb07296d4085e349a50e90bdca::blue::BLUE',
    pairAddress:
      '0xde705d4f3ded922b729d9b923be08e1391dd4caeff8496326123934d0fb1c312',
    website: 'https://bluefin.io/',
    twitter: 'https://twitter.com/bluefinapp',
    telegram: 'https://t.me/bluefinapp',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'boysclub-on-sui',
    symbol: 'BOYSS',
    name: 'Boysclub on Sui',
    address:
      '0x761feb1492359aa2160a07500c00bbe99fa904ea130552fc5ad07b448733be46::boyss::BOYSS',
    pairAddress:
      '0x2ba92cbb0d1478983356d8f4aefe42f1f856178fe03d8271adc59d44b65235f3',
    website: 'https://boysclubonsui.com/',
    twitter: 'https://x.com/BoysclubSui',
    telegram: 'https://t.me/boysclubsui',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0xb3a1146f8dba4f5940480764f204047d8ce0794286c8e5bdc1c111ca2a2ea8ae::bullshark::BULLSHARK',
    coingeckoId: '',
    pairAddress:
      '0xf9107158e4945d6bbc321c7471e0b7c9854c2d3a1b04aaff6acaa50b8ea203d2',
    website: 'https://bullshark.fun/',
    twitter: 'https://x.com/Bullsharkbot',
    telegram: 'https://t.me/bullshark_portal',
    name: 'BULLSHARK',
    symbol: 'BSHARK',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0x45d57f18eb53cbdcbad089bf6656204d949817fd7df7d12721cf8801112792fb::bob::BOB',
    coingeckoId: '',
    pairAddress:
      '0x08b7ec987d7f145d2f340746b31d1bc6e4de85cff2b68f0b2817316487089499',
    website: 'https://linktr.ee/bobonsui',
    twitter: 'https://x.com/BobTheBlobCoin',
    telegram: 'https://t.me/BobTheBlob_portal',
    logoUrl: '',
    name: 'BOB',
    symbol: 'BOB',
    decimals: 6,
    narratives: ['Meme', 'Others'],
  },
  {
    coingeckoId: 'bubl',
    symbol: 'BUBL',
    name: 'BUBL',
    address:
      '0x35b59a0d8707764cde2345e4a3acd025b73d3d639308e49df00eff7eec821d46::bubl::BUBL',
    pairAddress:
      '0x72022f3e27ae2715960de7e6b56d1cf728d7861cbbd582b4edd9a837c777a710',
    website: 'https://bublsui.com/',
    twitter: 'https://x.com/bublsui',
    telegram: 'https://t.me/bublsui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: '',
    symbol: 'BUCK',
    name: 'Bucket USD',
    address:
      '0xce7ff77a83ea0cb6fd39bd8748e2ec89a3f41e8efdc3f4eb123e0ca37b184db2::buck::BUCK',
    pairAddress:
      '0xe63329f43a9474d421be85ff270bafc04667b811d215d4d4ee2512bcf2713896',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
  },
  {
    coingeckoId: 'sui-bull',
    symbol: 'BULL',
    name: 'Sui Bull',
    address:
      '0xb0b6d9fa117da4f47c4895c4216cd3cad37d3b2f4425c62dbd4f4638b44e3f93::bull::BULL',
    pairAddress:
      '0x3f3cbf80676d2c9d6d36ec202ea6e128b3aefe130c87bd208b8b8acc40f92a94',
    website: 'https://suibull.lol/',
    twitter: 'https://x.com/SuiBullMeme',
    telegram: 'https://t.me/SuiBullChat',
    decimals: 6,
    narratives: [null],
  },
  {
    coingeckoId: 'bulla-2',
    symbol: 'BULLA',
    name: 'BULLA',
    address:
      '0xeec46a9527885ade0b62b984315f2f45d4cd40d9a8c19a553e553e722ab33239::bulla::BULLA',
    pairAddress:
      '0xebf3e4f099c57cd547491027c98076d61967d7f1a3cfa748531d71fbb7d59173',
    website: 'https://www.bulla.world/',
    twitter: 'https://x.com/BullaWorld',
    telegram: 'https://t.me/BULLAWORLD',
    decimals: 8,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'bucket-token',
    symbol: 'BUT',
    name: 'Bucket Token',
    address:
      '0xbc858cb910b9914bee64fff0f9b38855355a040c49155a17b265d9086d256545::but::BUT',
    pairAddress:
      '0x68d16416770f9b73b0b1b45e118f6ea3a2910f548f942fe335824fd515cdff08',
    website: 'https://bucketprotocol.io/',
    twitter: 'https://x.com/bucket_protocol',
    telegram: 'https://t.me/bucketprotocol',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    address:
      '0x0b559e66f39afcc202b7f529571eccad713402bc9fd4e3ecfa0956bbe24a3f51::cctoo::CCTOO',
    coingeckoId: '',
    pairAddress:
      '0x7c13f9df12bf3e8bb8deea6c0a71e3ab4dee2c4a9cd5e73dfe6186e8e5425bc6',
    website: '',
    twitter: '',
    telegram: '',
    logoUrl: '',
    name: 'CCTOO',
    symbol: 'CCTOO',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'cap-2',
    symbol: 'CAP',
    name: 'CAP',
    address:
      '0x893aa3f358b70e7dbcf957c64a1f016633630af42fb6097f25c33ef9fa738dd2::cap::CAP',
    pairAddress:
      '0xdf0a039f0d87b0be07ffdf4230bed60017c3d4d939d92d4d085e17d26acb34a7',
    website: 'https://www.caponsui.com/',
    twitter: 'https://x.com/caponsui',
    telegram: 'https://t.me/caponsui',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'cetus-protocol',
    symbol: 'CETUS',
    name: 'Cetus Protocol',
    address:
      '0x6864a6f921804860930db6ddbe2e16acdf8504495ea7481637a1c8b9a8fe54b::cetus::CETUS',
    pairAddress:
      '0x028d4fa3f5491b1afc7296dfa8913d6fa72a432aab3a99edc0eb91bfa5dd09df',
    website: 'https://www.cetus.zone/',
    twitter: 'https://x.com/cetusprotocol',
    telegram: 'https://t.me/cetusprotocol',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'sui-chad',
    symbol: 'CHAD',
    name: 'Sui Chad',
    address:
      '0x4c407edd882f5ba66813856676c486ce4dd16ed7c534d07cf5d50e015c288ab8::chad::CHAD',
    pairAddress:
      '0xb9e7e7e199ea0b78b3489249d3a282fb9c6445cb05f278d78502b86d0c5d90f2',
    website: 'https://suichad.com/',
    twitter: 'https://x.com/ChadOnSui',
    telegram: 'https://t.me/chadonsui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0x308fa16c7aead43e3a49a4ff2e76205ba2a12697234f4fe80a2da66515284060::city::CITY',
    coingeckoId: '',
    pairAddress:
      '0x98636fafb720e06b908f1837f9573539cd949576dfa540b0bc518c15da571330',
    website: 'https://hapticforge.com/alpha-city',
    twitter: 'https://x.com/AlphaCity_AI',
    telegram: 'https://t.me/AlphaCityUnderground',
    logoUrl: '',
    name: 'Alpha City',
    symbol: 'CITY',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'chirp-token',
    symbol: 'CHIRP',
    name: 'Chirp Token',
    address:
      '0x1ef4c0b20340b8c6a59438204467ca71e1e7cbe918526f9c2c6c5444517cd5ca::chirp::CHIRP',
    pairAddress:
      '0x9c3a06e2ca93d0a3b9bd35e6de2466f8382bc2a643c875a0aac9eb7db411ce48',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 10,
    narratives: ['Meme'],
  },
  {
    address:
      '0xd88eb58ee2961061052a103131f4a7232a7b47ed1256d9db3cb096b27178ffdb::chop::CHOP',
    coingeckoId: '',
    pairAddress:
      '0x1cad5c62c946b35b54c3e9e6684d782f247954ed0aac25d6ca18d61f1a47c6c8',
    website: 'https://chopsui.net/',
    twitter: 'https://x.com/CHOP_on_SUI',
    telegram: 'https://t.me/chop_on_sui',
    name: 'Chop Sui',
    symbol: 'CHOP',
    isPartner: true,
    decimals: 9,
    narratives: ['Meme', 'DeFi'],
  },
  {
    address:
      '0xfad3c168a6f5be6d74adf2e6dd8ff937736f367d8b98c7e4929fd00755216d83::charf::CHARF',
    coingeckoId: '',
    pairAddress:
      '0xee8c12ae78589a4eac75502cdd0cbb81b37c744894ecb8fbc522bb5371e3eb53',
    website: 'https://shibachad.net/shibachad',
    twitter: 'https://x.com/chad_shiba',
    telegram: 'https://t.me/ChadDogonSui',
    logoUrl: '',
    name: 'Chad Dog',
    symbol: 'CHARF',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0x4c981f3ff786cdb9e514da897ab8a953647dae2ace9679e8358eec1e3e8871ac::dmc::DMC',
    coingeckoId: '',
    pairAddress:
      '0x08ed0bdf7445f22b94fcc8a8e214c4b4f74891e387d5ed6429d0ace4a4761566',
    website: 'https://deloreanlabs.com/',
    twitter: 'https://x.com/deloreanlabs',
    telegram: 'https://t.me/deloreanlabs',
    logoUrl: '',
    name: 'DeLorean',
    symbol: 'DMC',
    decimals: 9,
    narratives: ['Other'],
    new: true,
  },

  {
    address:
      '0x5960b1ccc59554482909cbbd3d756994ca63c2a5535adbbb772414321a5a7220::dmoon::DMOON',
    coingeckoId: '',
    pairAddress:
      '0x32006a19c97209e82ddfdc40dad77a737f05afd4c8b7e148d7c1f2224f9667e2',
    website: 'https://www.daapmoons.com/',
    twitter: 'https://x.com/Dapp_moons',
    telegram: 'https://t.me/dapp_moons',
    logoUrl: '',
    name: 'Dapp Moons',
    symbol: 'DMOON',
    decimals: 6,
    narratives: ['DeFi'],
    new: true,
  },
  {
    coingeckoId: 'dak',
    symbol: 'DAK',
    name: 'dak',
    address:
      '0x41636c138167952207c88f5a75e433c9e880bc7bd5e4e46047d82be266d36712::dak::DAK',
    pairAddress:
      '0x6c40c71d281704ee29cf1b9fada2c10ce4f2d7d374c283c79ae8d78ca6290762',
    website: 'https://www.daksui.xyz/',
    twitter: 'https://x.com/DakReserv',
    telegram: 'https://t.me/dakonsui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suibeaver',
    symbol: 'DAM',
    name: 'suibeaver',
    address:
      '0xaf3aae4940a248739ce4964857381fc3f3149a6d05375bfbb2118592907e3bbb::dam::DAM',
    pairAddress:
      '0x3487e99bda85bd17360e2c32af208df69551e0673f920e8906404c32e9a47fa0',
    website: 'https://suibeaver.xyz',
    twitter: 'https://x.com/suibeaver',
    telegram: 'https://t.me/suibeaver_dam',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'daossui-token',
    symbol: 'DAOS',
    name: 'Daossui Token',
    address:
      '0xd40cec91f6dca0673b25451fb0d654e62ad13bf6546a32a21ef0c59eba42e71c::daos::DAOS',
    pairAddress:
      '0x6cd91ac6eab109dbefbad9693760f929d963c01b9ddba21d3584ca9de36402b5',
    website: 'https://daossui.io/',
    twitter: 'https://x.com/daosdotsui',
    telegram: 'https://t.me/daosdotsui',
    decimals: 6,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'virtualdaos',
    symbol: 'DAOX',
    name: 'VirtualDaos',
    address:
      '0xc7b842347b0fbebabdee379414e874abc7fc5294b1e08961baa32e501ebedb48::daox::DAOX',
    pairAddress:
      '0xfa4d7cfc50afb9813f2e29824dc2c8ffc8bccf384c5b9773cde6134b88f62ebb',
    website: 'https://virtualdaos.ai',
    twitter: 'https://x.com/virtualdaos',
    telegram: 'https://t.me/virtual_daos',
    decimals: 6,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'deep',
    symbol: 'DEEP',
    name: 'DeepBook',
    address:
      '0xdeeb7a4662eec9f2f3def03fb937a663dddaa2e215b8078a284d026b7946c270::deep::DEEP',
    pairAddress:
      '0xe01243f37f712ef87e556afb9b1d03d0fae13f96d324ec912daffc339dfdcbd2',
    website: 'https://deepbook.tech/',
    twitter: 'https://x.com/DeepBookonSui',
    telegram: '',
    decimals: 6,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'dolphin-agent',
    symbol: 'DOLA',
    name: 'Dolphin Agent',
    address:
      '0x418879f4f7037e40e31d0887ec0a080e6659472bc2a8408a38e153741ea9d1e0::dola::DOLA',
    pairAddress:
      '0x7c9a2994b44da6ceb1ab15afbe353e02d43b2239e1c02beed7188fc9b456a246',
    website: 'https://dolphinagent.com/',
    twitter: 'https://x.com/Dolphin_AgentX',
    telegram: 'https://t.me/DolphinAgent',
    decimals: 6,
    narratives: ['AI'],
  },
  {
    coingeckoId: 'drife-2',
    symbol: 'DRF',
    name: 'Drife',
    address:
      '0x294de7579d55c110a00a7c4946e09a1b5cbeca2592fbb83fd7bfacba3cfeaf0e::drf::DRF',
    pairAddress:
      '0xbba38df125bfe2267af5ebb05d741b2a2364f5893d9ec2f8c856dba0f0365e32',
    website: 'https://www.drife.io/',
    twitter: 'https://x.com/Drife_official',
    telegram: 'https://t.me/Drife_officialchat',
    decimals: 6,
    narratives: ['Others'],
  },

  {
    coingeckoId: 'e4c',
    symbol: 'E4C',
    name: 'E4C',
    address:
      '0x84b27ddadc6139c7e8837fef6759eba4670ba3fc0679acd118b4e9252f834e29::e4c::E4C',
    pairAddress:
      '0xb63eddf81292bfebd1504c1388a72ea3b011a217bbbf35cb7dd5211bad361cbc',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['Others'],
  },

  {
    coingeckoId: '',
    symbol: 'ETH',
    name: 'ETH by Sui Bridge',
    address:
      '0xd0e89b2af5e4910726fbcd8b8dd37bb79b29e5f83f7491bca830e94f7f226d29::eth::ETH',
    pairAddress:
      '0x9e59de50d9e5979fc03ac5bcacdb581c823dbd27d63a036131e17b391f2fac88',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 8,
  },
  {
    address:
      '0x4a2d3947831057dc859d272082900d7b06cf8b2b8ab4e456463f83e3a0e3d7d1::fartcoin::FARTCOIN',
    coingeckoId: '',
    pairAddress:
      '0x733b47f3917f1b94542886c6b9c38cd13fbf78d8f1f3b7fd75424df43f7e5ca4',
    website: 'https://fartcoinonsui.com/',
    twitter: 'https://x.com/suifartcoin',
    telegram: 'https://t.me/fartcoinsui',
    logoUrl: '',
    name: 'Fartcoin on Sui',
    symbol: 'Fartcoin',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'fish-cat',
    symbol: 'FAT',
    name: 'Fish Cat',
    address:
      '0xfa880b0cc0e21ee1b7a113b4d9e2d135ef9976cdbcd5da761a067a75ac0cd776::fat::FAT',
    pairAddress:
      '0x5c01e90e2010c3883612821ac3a75e3e18005cf9adfea8f6ad2087a7366607d1',
    website: 'https://www.fishcatsui.xyz/',
    twitter: 'https://x.com/fishcatsui?s=21&t=WlxoQ2mrqTekKNv6Qg8lnQ',
    telegram: 'https://t.me/fishcatsuiii',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: '',
    symbol: 'FDUSD',
    name: 'First Digital USD',
    address:
      '0xf16e6b723f242ec745dfd7634ad072c42d5c1d9ac9d62a39c381303eaa57693a::fdusd::FDUSD',
    pairAddress:
      '0x43d4c9adc1d669ef85d557cf1d430f311dc4eb043a8e7b78e972c1f96ec2cd60',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 6,
  },
  {
    address:
      '0xba7503e771e108af206ec6ee2f4eac78ac18630f16ad28c8f31d817216e16728::fish::FISH',
    coingeckoId: '',
    pairAddress:
      '0x255ffa2072b8ddd4a3432e7ac1d1fe70e605c7c219455020ca56969b7af7d8bf',
    website: 'https://fishonsui.xyz/',
    twitter: 'https://x.com/fishonsui',
    telegram: 'https://t.me/fishonsui',
    name: 'FISH ON SUI',
    symbol: 'FISH',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'flowx-finance',
    symbol: 'FLX',
    name: 'FlowX Finance',
    address:
      '0x6dae8ca14311574fdfe555524ea48558e3d1360d1607d1c7f98af867e3b7976c::flx::FLX',
    pairAddress:
      '0x9ed5b1a7bd56c700ae978f54b5b218ebe545ad39ab51995c9f1a907e9560050c',
    website: 'https://flowx.finance/',
    twitter: 'https://twitter.com/FlowX_finance',
    telegram: 'https://t.me/flowx_finance',
    decimals: 8,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'frogg-and-ratt',
    symbol: 'FRATT',
    name: 'Frogg and Ratt',
    address:
      '0x31348f17429e6b37ed269cc667cc83947ff8c54593dcbd1a56cae06a895a38be::fratt::FRATT',
    pairAddress:
      '0x1e142b25b10035c40af0624d455dd4d959938c18af89a28b004f3da583478bc7',
    website: 'https://www.fratt.xyz/',
    twitter: 'https://x.com/FrattSui',
    telegram: 'https://t.me/FroggNRatt',
    decimals: 2,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'fud-the-pug',
    symbol: 'FUD',
    name: 'Fud the Pug',
    address:
      '0x76cb819b01abed502bee8a702b4c2d547532c12f25001c9dea795a5e631c26f1::fud::FUD',
    pairAddress:
      '0xbd85f61a1b755b6034c62f16938d6da7c85941705d9d10aa1843b809b0e35582',
    website: 'https://fudthepug.com/',
    twitter: 'https://twitter.com/fudthepug',
    telegram: 'https://t.me/fudthepug',
    decimals: 5,
    narratives: ['Meme'],
  },
  {
    address:
      '0x13cda3fa8bf4d4dbe2c87763e65c0638855b90dd2a9759be4dece8a69fb56f7b::gabe::GABE',
    coingeckoId: '',
    pairAddress:
      '0x054364a8482531a8dc4b38aa42fc13d7d63bbcba2187be8d7866c91b252a1379',
    website: '',
    twitter: 'https://x.com/gabedotsui',
    telegram: 't.me/GabeDotSui',
    logoUrl: '',
    name: 'Gabeonsui',
    symbol: 'GABE',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'captain-goofy',
    symbol: 'GOOF',
    name: 'Captain GOOFY',
    address:
      '0xe0644f3e46b2d9f319a2cc3491155c75d1b6132ba9b3601c6e7e102e17296645::goof::GOOF',
    pairAddress:
      '0xcfb143318aeb2ed90f03c210cbb8967f35115aa93ca2a4893bc44bf6de1fd226',
    website: 'https://captaingoofy.com/',
    twitter: 'https://x.com/CaptnGoof',
    telegram: 'https://t.me/CaptainGOOFy',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0x3a304c7feba2d819ea57c3542d68439ca2c386ba02159c740f7b406e592c62ea::haedal::HAEDAL',
    coingeckoId: '',
    pairAddress:
      '0x711f5d37e3b09b026b182d9e0973d05e9a837d11066ff48f4a55a426d8913359',
    twitter: 'https://x.com/haedalprotocol',
    telegram: '',
    website: 'https://www.haedal.xyz/',
    logoUrl: '',
    name: 'Haedal',
    symbol: 'HAEDAL',
    decimals: 9,
    narratives: ['DeFi'],
    new: true,
  },
  {
    address:
      '0xbde4ba4c2e274a60ce15c1cfff9e5c42e41654ac8b6d906a57efa4bd3c29f47d::hasui::HASUI',
    coingeckoId: 'haedal-staked-sui',
    pairAddress:
      '0xaa020ad81e1621d98d4fb82c4acb80dc064722f24ef828ab633bef50fc28268b',
    website: 'https://www.haedal.xyz/',
    twitter: 'https://x.com/haedalprotocol',
    telegram: '',
    name: 'Haedal staked SUI',
    symbol: 'haSUI',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'sudeng',
    symbol: 'HIPPO',
    name: 'sudeng',
    address:
      '0x8993129d72e733985f7f1a00396cbd055bad6f817fee36576ce483c8bbb8b87b::sudeng::SUDENG',
    pairAddress:
      '0xb785e6eed355c1f8367c06d2b0cb9303ab167f8359a129bb003891ee54c6fce0',
    website: 'https://www.hippocto.meme/',
    twitter: 'https://x.com/hippo_cto',
    telegram: 'https://t.me/HIPPO_SUI',
    decimals: 9,
    narratives: ['Meme'],
  },

  {
    coingeckoId: 'hopper-the-rabbit',
    symbol: 'HOPPER',
    name: 'Hopper the Rabbit',
    address:
      '0xd7b720a37be0f5540e2499c989cbab660ae6b64f28ec54ceeea68ad3936b8d41::hopper::HOPPER',
    pairAddress:
      '0xda8b09cf78bbb2c0b58be758fe70c60c20fa1a73b20438cb3d52b2e83da9b37a',
    website: 'https://hoppersui.com/',
    twitter: 'https://x.com/hopperonsui',
    telegram: 'https://t.me/hopperonsui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suicune-on-sui',
    symbol: 'hSUI',
    name: 'Suicune',
    address:
      '0x8c47c0bde84b7056520a44f46c56383e714cc9b6a55e919d8736a34ec7ccb533::suicune::SUICUNE',
    pairAddress:
      '0x21026a3198bf7e656441355dd78f2c14778134d10d16d17c2cf5651d99d00ee9',
    website: 'https://suicune.dog',
    twitter: 'https://x.com/hsuionsui',
    telegram: 'https://t.me/SuicuneOnSuiPortal',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0x7262fb2f7a3a14c888c438a3cd9b912469a58cf60f367352c46584262e8299aa::ika::IKA',
    coingeckoId: '',
    pairAddress:
      '0x3b7dcdc83aa0248b3296ca1c43a57f8d4fe33d169d73b0979cf82d23c81c3435',
    website: 'https://ika.xyz/',
    twitter: 'https://x.com/ikadotxyz',
    telegram: 'https://t.me/ikadotxyz',
    logoUrl: '',
    name: 'IKA Token',
    symbol: 'IKA',
    decimals: 9,
    narratives: ['DeFi'],
    new: true,
  },
  {
    address:
      '0x2775b665fa5837592088e648e98e0597d79caedcc3039d4dc3a47dc647044134::ita::ITA',
    coingeckoId: '',
    pairAddress:
      '0x73cab69f2ebd6f6e00b05ffdd3c2e59c74922e51daf34f37b462007262998b97',
    website: 'https://www.itaonsui.xyz/',
    twitter: 'https://x.com/itaonsui',
    telegram: 'https://t.me/itaonsui',
    logoUrl: '',
    name: 'ITA On SUI',
    symbol: 'ITA',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0xbb8fa709408f3f9cb80909928990d6e2edf5f246757943600ff1d41aaae627b5::iamsui::IAMSUI',
    coingeckoId: '',
    pairAddress:
      '0xf6b85708232d1f7e5f84b2cc348324e6f58c87aab84ea3cb1be3796fd4100350',
    twitter: 'https://x.com/iamsuiofficial',
    telegram: 'https://t.me/iamsuiofficial',
    website: 'https://iamsui.com/',
    logoUrl: '',
    name: 'I AM SUI',
    symbol: 'IAMSUI',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0xa9396a2d0b927fad93666fee828d6cea49c1bf15779d3717b08fa00424669e3e::isg::ISG',
    coingeckoId: '',
    pairAddress:
      '0x78883f163d1b4404b87033f16e5c3df9c798c3989e13c83b40879c6f711c0f12',
    website: 'https://www.infinitesuiglitch.xyz/',
    twitter: 'https://x.com/sui_glitch',
    telegram: 'https://t.me/infinitesuiglitch',
    logoUrl: '',
    name: 'Infinite Sui Glitch',
    symbol: 'ISG',
    decimals: 0,
    narratives: ['Others'],
  },
  {
    coingeckoId: 'jelly-ai',
    symbol: 'JAI',
    name: 'JELLY AI',
    address:
      '0x424b293afd846e994a6791f9c47bce03fa3b8a19d54bf670a6bb9de3bc3737c7::jai::JAI',
    pairAddress:
      '0x99113e387183ac314676ab0a45aff544cfbb1f9d6535ce80714457ead33d7c39',
    website: 'https://jumpgames.fun/jellyai',
    twitter: 'https://x.com/worldwarjelly',
    telegram: 'https://t.me/worldwarjelly',
    decimals: 6,
    narratives: ['AI'],
  },
  {
    address:
      '0x69f1b155a10ca76648b3018c5cdc702b804807680f613aceb9ab358450130dd2::kairos::KAIROS',
    coingeckoId: '',
    pairAddress:
      '0x33b86368c2424f796ed681bbe6b66d2bebb6f93a530554ed2b6d834959815e10',
    website: 'https://suixbt.xyz/',
    twitter: 'https://x.com/suixbt_agent',
    telegram: 'https://t.me/kairos_portal',
    name: 'Kairos',
    symbol: 'KAIROS',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    coingeckoId: 'kaka-the-cat',
    symbol: 'KAKA',
    name: 'KAKA the cat',
    address:
      '0x7a2a37816b9096c3054194b499e39f8956f8ce2ed53a8d74059c6cce1d999fab::kaka::KAKA',
    pairAddress:
      '0xd094ce663fbebee3bfe1ad54123356c30f91acafdbb776dc3d73cc626cc576b3',
    website: 'https://suiai.io/',
    twitter: 'https://x.com/kakacat_ai',
    telegram: 'https://t.me/kakaportal',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'kriyadex',
    symbol: 'KDX',
    name: 'Kriya',
    address:
      '0x3b68324b392cee9cd28eba82df39860b6b220dc89bdd9b21f675d23d6b7416f1::kdx::KDX',
    pairAddress:
      '0xb89d930966681b5a6d6b37e0be5891f93c98cd33aeca94253cce960e3c3457d1',
    website: 'https://kriya.finance/',
    twitter: 'https://x.com/KriyaDEX',
    telegram: '',
    decimals: 6,
    narratives: ['DeFi'],
  },
  {
    address:
      '0x6fee0f4d3e36392531550e1afd2bd879b1326959b2d4870eb7ccea9c69bc144f::koduck::KODUCK',
    coingeckoId: '',
    pairAddress:
      '0xd1ef178b9baa05252b34c182062b1b8bd44f41b321481495061d5c1098d8cb31',
    twitter: 'https://x.com/koducktheduck',
    telegram: 'https://t.me/koducktheduck',
    website: 'https://koduck.org/',
    logoUrl: '',
    name: 'Koduck On Sui',
    symbol: 'KODUCK',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'koi-5',
    symbol: 'KOI',
    name: 'KOI',
    address:
      '0x01d430425a8a681ef26315e78a082fe744f8d0bbdbd1ab76b9fd78ada09bedca::Koi::KOI',
    pairAddress:
      '0xea18d910c4f7e5c850f1e730dfda8228d710962e50cc31ef28d211c54108e02a',
    website: 'http://koisui.fun/',
    twitter: 'https://x.com/KoiOnSui',
    telegram: 'https://t.me/koionsui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'kong-sui',
    symbol: 'KONG',
    name: 'KONG SUI',
    address:
      '0xb0c3e7ae67c9161273aab9a06e589c1c13479337d14c794251a97df46822f2cb::kong::KONG',
    pairAddress:
      '0x48ff70ae056c64407ebf08dc532964434ef2108b2b232e7a01d78d17f51123b7',
    website: 'https://www.kongonsui.org/',
    twitter: 'https://x.com/kongonsui',
    telegram: 'https://t.me/Kongonsui',
    decimals: 1,
    narratives: ['Meme'],
  },
  {
    address:
      '0x4b048fdbba6b4d8b28cae9364ebe70cc0c5edcc6a64ccd611c58dd2685fcc346::kfk::KFK',
    coingeckoId: '',
    pairAddress:
      '0x6d26fca4e7a4130b736b584c7a05e098c868140eb024182dd6771d084d8b84f5',
    website: 'https://kungfu-kangaroo.com/',
    twitter: 'https://x.com/Kangaroo_Sui',
    telegram: 'https://t.me/KFKonSUI',
    logoUrl: '',
    name: 'Kung Fu Kangaroo',
    symbol: 'KFK',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'lemon-3',
    symbol: 'LEMON',
    name: 'Lemon',
    address:
      '0xb6618debe65795bf0ecd5373eec3ab74d38e26742c1b0817c8b00896d2cb7150::lemon::LEMON',
    pairAddress:
      '0x5d84ea40c75d3b592d996ce1c5418916576f168ea26dd99dbb0b1cfd55a7c896',
    website: 'https://www.lemonsofsui.com',
    twitter: 'https://x.com/LemonsOfSui',
    telegram: '',
    decimals: 6,
    narratives: ['Meme'],
  },

  {
    coingeckoId: 'liquor',
    symbol: 'LIQ',
    name: 'Liquor',
    address:
      '0x9c86d1926a0a39e906f20674d6a35f337be8625ebcb6b799ee8ff011f328bee2::liq::LIQ',
    pairAddress:
      '0xa179d037fc1e6492550bdf8ee3316963dc9175a2f124e37fd72cb3bbae53d412',
    website: 'https://www.beliquoronsui.com/',
    twitter: 'https://x.com/beliquoronsui/',
    telegram: 'https://t.me/beliquor_v2',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'lofi-2',
    symbol: 'LOFI',
    name: 'LOFI',
    address:
      '0xf22da9a24ad027cccb5f2d496cbe91de953d363513db08a3a734d361c7c17503::LOFI::LOFI',
    pairAddress:
      '0xd6918afa64d432b84b48088d165b0dda0b7459463a7d66365f7ff890cae22d2d',
    website: 'https://lofitheyeti.com/',
    twitter: 'https://x.com/lofitheyeti',
    telegram: 'https://t.me/LofiOnSui',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0x808a8287e9c87c1f97fb133dbd206381804ebd7edfe1af4dbab5eb73668a3449::lofita::LOFITA',
    coingeckoId: '',
    pairAddress:
      '0x0c46db8f8d243416901318fc0824fb4c7edc3012d1407a38109bb2a11ff91886',
    website: 'https://lofitatheyeti.fun/',
    twitter: 'https://x.com/lofitaqueenyeti',
    telegram: 'https://t.me/LofitaYETI',
    logoUrl: '',
    name: 'LOFITA THE YETI',
    symbol: 'LOFITA',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'loopy-sui',
    symbol: 'LOOPY',
    name: 'LOOPY',
    address:
      '0x9b9c0e26a8ace7edb8fce14acd81507c507c677a400cfb9cc9a0ca4a8432a97a::loopy_sui::LOOPY_SUI',
    pairAddress:
      '0xe4ff047ec4e6cb5dec195c4c71bc435223bf0273f1473ab6a10cf6ad132bdda1',
    website: 'https://loopy.love/',
    twitter: 'https://x.com/LoopySUI',
    telegram: 'https://t.me/LoopySUI',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'memefi-2',
    symbol: 'MemeFi',
    name: 'MemeFi',
    address:
      '0x506a6fc25f1c7d52ceb06ea44a3114c9380f8e2029b4356019822f248b49e411::memefi::MEMEFI',
    pairAddress:
      '0x2f47d887c4ca1640c48946676dc3ccb40025cdb0aa52f21d6b043568a7c39ffe',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: [null],
  },
  {
    address:
      '0x5ed0595332bb9adc4cc7af3fb7eea888cf68377f9497b22a186d681a6e92f1f6::mysten::MYSTEN',
    coingeckoId: '',
    pairAddress:
      '0x79ac03f247998096a789184090d2e9404b64e8dbbb2cc590c99387aa5f639cd6',
    twitter: 'https://x.com/TeamMysten',
    telegram: 'https://t.me/TeamMysten',
    website: 'https://www.teammysten.com/',
    logoUrl: '',
    name: 'Team Mysten',
    symbol: 'MYSTEN',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x7c486f6723448de6c2a1515eb66fbc91d496063acfa0392b862aad11716ba960::mblub::MBLUB',
    coingeckoId: '',
    pairAddress:
      '0x711dffb09ddbb285f1671311f6bf2b927ff4b58cbafc5a3a1035f846e7935186',
    twitter: 'https://x.com/MutantBlub',
    telegram: 'https://t.me/MutantBlubonSui',
    website: 'https://www.mutantblub.com/',
    logoUrl: '',
    name: 'MutantBlub',
    symbol: 'MBLUB',
    decimals: 9,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x172ae9e9b46770a70f479404d76e2f6561507011ef77a247fe3f58e7a5840a0d::manny::MANNY',
    coingeckoId: '',
    pairAddress:
      '0x8e648ee8cc227e8678cdb0b9925e97af0b79e5b367b0e8a709706db7e752e5cf',
    website: 'https://mannycoin.com/',
    twitter: 'https://x.com/MEMECOIN_MANNY',
    telegram: 't.me/memecoinmanny',
    logoUrl: '',
    name: 'memecoin manny',
    symbol: 'MANNY',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x2d79d5911998b695ca4dcf15a0e850e3029d169d127a007887c5d57e98c87ec8::millie::MILLIE',
    coingeckoId: '',
    pairAddress:
      '0xb96eb758ac09ef45f3b964d31200838b0a9c521df780f4272576574963d18691',
    website: 'https://millieonsui.xyz/',
    twitter: 'https://x.com/Millieonsui',
    telegram: 'https://t.me/MillieOnSui',
    logoUrl: '',
    name: 'Millie',
    symbol: 'MILLIE',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'meow-3',
    symbol: 'MEOW',
    name: 'MEOW',
    address:
      '0x06b145d0322e389d6225f336ab57bba4c67e4e701bd6c6bc959d90675900a17e::meow::MEOW',
    pairAddress:
      '0x3d72450bd834bd243dc9f09f5dd2fcb00e4405fd43f753214a1d557f2c3982b8',
    website: '',
    twitter: 'https://x.com/MeowOnSui',
    telegram: 'https://t.me/meowonsui',
    decimals: 6,
    narratives: ['Meme'],
  },

  {
    coingeckoId: 'mochi-3',
    symbol: 'MOCHI',
    name: 'Mochi',
    address:
      '0xa26788cb462ae9242d9483bdbe5a82188ba0eaeae3c5e9237d30cbcb83ce7a88::mochi::MOCHI',
    pairAddress:
      '0xd617f03bed32e870ad7f4701b42eb1ff8f831ea33aa751b9614ffb6d8c3601f7',
    website: 'https://itsmochi.com/',
    twitter: 'https://x.com/Mochi_Blob',
    telegram: 'https://t.me/mochi_blob_official',
    isPartner: true,
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'bluemove',
    symbol: 'MOVE',
    name: 'BlueMove',
    address:
      '0xd9f9b0b4f35276eecd1eea6985bfabe2a2bbd5575f9adb9162ccbdb4ddebde7f::smove::SMOVE',
    pairAddress:
      '0x41aecbafec6dddc032778f195fffe5cfbc8f8ba11e722902dc3448eee85c6059',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    coingeckoId: 'movepump',
    symbol: 'MOVEPUMP',
    name: 'MovePump',
    address:
      '0xe38babf1e0f7e549f9d4c0441c9d00c8ffc9dcd34dcc19f3bb12eafe0267e037::movepump::MOVEPUMP',
    pairAddress:
      '0xee5e325b5d24436217bf8b7183f6b6378999e55dec808ee550f1567aea657c1f',
    website: 'https://movepump.com/',
    twitter: '',
    telegram: 'https://t.me/w3pr1nt',
    decimals: 6,
    narratives: ['Others'],
  },
  {
    address:
      '0x6aadd2bc606a7de5ed23f94ac8728b7519e5c9c89fc250c65a01d1cdaf74760d::meg::MEG',
    coingeckoId: '',
    pairAddress:
      '0xe811d102e4d0cf4992c64e9e6a99eea415bda17a92ca732e5bef8c907f002de6',
    website: 'https://megsui.vercel.app/',
    twitter: 'https://x.com/Megalodon_sui',
    telegram: 'https://t.me/+XUHJVj793hAxZDc5',
    logoUrl: '',
    name: 'Megalodon',
    symbol: 'MEG',
    decimals: 9,
    narratives: ['Meme'],
  },

  {
    coingeckoId: 'suinami',
    symbol: 'NAMI',
    name: 'SUINAMI',
    address:
      '0xe7397f9f6a5a60010a729ed1a470130936f090cafcdc0cdca6c3260b17ac0c9b::nami::NAMI',
    pairAddress:
      '0x77fd919356c6b53fa91fb5a5d1394ff4749d62adc190911e48f9af15581b8ec8',
    website: 'https://suinami.wtf/',
    twitter: 'https://x.com/suinami_sui',
    telegram: 'https://t.me/suinamionsui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0x44bec60c55e7c4233a240b804310511e6d0c18168636bf537639669035bbb1b2::natl::NATL',
    coingeckoId: '',
    pairAddress:
      '0x762a4464bc80c7fc895a3acf1ed32d4e76ba676655f89d38d5608765b4d39c15',
    website: 'https://nautiagent.fun/chat',
    twitter: 'https://x.com/NautilusAgentAI',
    telegram: 'https://x.com/NautilusAgentAI',
    name: 'Nautilus Agent',
    symbol: 'NATL',
    decimals: 6,
    narratives: ['AI'],
  },
  {
    coingeckoId: 'navi',
    symbol: 'NAVX',
    name: 'NAVI Protocol',
    address:
      '0xa99b8952d4f7d947ea77fe0ecdcc9e5fc0bcab2841d6e2a5aa00c3044e5544b5::navx::NAVX',
    pairAddress:
      '0xa0b4fef70ccef039b94512d6384806979d4c201c5e12af9a4b0458454b80da35',
    website: 'https://naviprotocol.io/',
    twitter: 'https://x.com/navi_protocol',
    telegram: 'https://t.me/navi_protocol',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'neonet-ai-by-suiai',
    symbol: 'NEONET',
    name: 'NeoNet AI by SuiAI',
    address:
      '0xc1a35b6a9771e6eb69e3b36e921a3a373e6d33e6f863dab6949ed3c2d1228f73::neonet::NEONET',
    pairAddress:
      '0x549a983b3b98ca4e77f17b42f62033c185a947c9c0827c68f0262f63fe189a7b',
    website: 'https://neonetai.ai',
    twitter: 'https://x.com/neonet_agent',
    telegram: 'https://t.me/neonetportal',
    decimals: 6,
    narratives: ['AI'],
  },
  {
    coingeckoId: 'suins-token',
    symbol: 'NS',
    name: 'SuiNS Token',
    address:
      '0x5145494a5f5100e645e4b0aa950fa6b68f614e8c59e17bc5ded3495123a79178::ns::NS',
    pairAddress:
      '0x763f63cbada3a932c46972c6c6dcf1abd8a9a73331908a1d7ef24c2232d85520',
    website: 'https://suins.io',
    twitter: 'https://x.com/suinsdapp',
    telegram: '',
    decimals: 6,
    narratives: ['Others'],
  },
  {
    coingeckoId: 'oceansgallerie-on-sui',
    symbol: 'OCEANS',
    name: 'OceansGallerie On SUI',
    address:
      '0xe90c71d308d8e6fed933d20f8b94d811e1dac649dac7815762520e90f84392f7::oceans::OCEANS',
    pairAddress:
      '0xaa0657731ad4f99c6694dab2f9159d1bbfafaa7f1f889ebd2622c3c74e7037d4',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    address:
      '0xfb412f44cf084389abd1e00faf29bdb56e083ef14c4c16b98e57712416e83fed::olo::OLO',
    coingeckoId: '',
    pairAddress:
      '0x91cb5bfccbcdc0cbb11e7d5d21541aa2cd7c728922ef3dc17ec9523c03c1c6be',
    website: 'https://olothecroc.carrd.co/',
    twitter: 'https://x.com/OloTheCroc',
    telegram: 'https://t.me/oloschat',
    logoUrl: '',
    name: 'Olo The Croc',
    symbol: 'OLO',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'osiris',
    symbol: 'OSIRI',
    name: 'Osiris',
    address:
      '0x42e826aa6c71325e2aaaf031976e023d75eefe584116f9349de5b0e56e648e49::osiri::OSIRI',
    pairAddress:
      '0x867434151a1f641e86832f068cb75a36d2a09cdb6ced5a840baec2ae940daed6',
    website: 'https://resurrect.fun/agent/osiris',
    twitter: 'https://x.com/theosirisai',
    telegram: 'https://t.me/suiosiris',
    decimals: 9,
    narratives: ['AI'],
  },

  {
    address:
      '0xd31a10b275ddcfe846f8aea65d8449890b02d8aacb67c07d513b25b71d695f57::olivai::OLIVAI',
    coingeckoId: '',
    pairAddress:
      '0xc7e6ce902165cf3c132b4560e50721695674bb9b50d1da973ce23d1ae59986a2',
    twitter: 'https://x.com/olivai01',
    telegram: 'https://t.me/OlivAI01GroupChat',
    website: 'https://www.olivai01.ai/',
    logoUrl: '',
    name: 'OLIVAI',
    symbol: 'OLIVAI',
    decimals: 6,
    narratives: ['AI'],
    new: true,
  },
  {
    address:
      '0x741d09e29d48b26dc35ba4d0f6e2cca9b0744f5be54b26fd106fdc8c78134701::pupui::PUPUI',
    coingeckoId: '',
    pairAddress:
      '0x4293bfdb4dd0eff08187ca78d30c8e43d3856dd93ad02fe3421eb4126d71cfdd',
    website: 'https://pupui.site/',
    twitter: 'https://x.com/pupuimeme',
    telegram: 'https://t.me/pupuichat/1',
    logoUrl: '',
    name: 'PUPUIZENS',
    symbol: 'PUPUI',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0xc9523f683256502be15ec4979098d510f67b6d3f0df02eebf124515014433270::pans::PANS',
    coingeckoId: '',
    pairAddress:
      '0x155b01dc5dbf6eb319ee5df50d201ae49fdc7a0a074acfe4fe1201acbf181a56',
    website: 'https://www.pandasui.com/',
    twitter: 'https://x.com/0xPandaSui',
    telegram: 'https://t.me/+XeXnZM6L7XA2YjU1',
    logoUrl: '',
    name: 'PandaSui Coin',
    symbol: 'PANS',
    decimals: 9,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x99df571c611598304c5c2b43fc3f58bd97095566788d576eca53b1aad6a53c95::poke::POKE',
    coingeckoId: '',
    pairAddress:
      '0xa7da6a5ab0018f712c77b68f0d491848885b9407581618a166412746edcbb822',
    twitter: 'https://x.com/PokeSuiofc',
    telegram: 'https://www.pokesui.xyz/',
    website: 'https://www.pokesui.xyz/',
    logoUrl: '',
    name: 'POKE SUI',
    symbol: 'POKE',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x288710173f12f677ac38b0c2b764a0fea8108cb5e32059c3dd8f650d65e2cb25::pepe::PEPE',
    coingeckoId: '',
    pairAddress:
      '0x332777e0d433f261307b907a92b3fc64841d24373a7518d85dda102def2e0a66',
    website: 'https://suipepe.com/',
    twitter: 'https://x.com/pepe_sui_token',
    telegram: 'https://t.me/pepe_sui_token',
    name: 'Pepe on Sui',
    symbol: 'PEPE',
    decimals: 2,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'pigu',
    symbol: 'PIGU',
    name: 'PIGU',
    address:
      '0xfc71274a94f5d9cd1ae6928ecfc9fa910d03eb28258fddeb9842ac3c7b4f3ae6::pigu::PIGU',
    pairAddress:
      '0x4ca41502a73820476cf6d8c52de1e8201068b41e2d892e20fe570c6f20532de9',
    website: 'https://www.pigu.world/',
    twitter: 'https://x.com/Piguworld',
    telegram: '',
    decimals: 5,
    narratives: ['Meme'],
  },
  {
    address:
      '0x2cd6f14a4b64c3a0fa9c644e8ed88d9c91d789a071886d67d24e6b435147063d::pugwif::PUGWIF',
    coingeckoId: '',
    pairAddress:
      '0xd7b55da72dca913b072a0e2842b44dbce68d9d88cc9b0626b1262659ce060c46',
    website: 'https://pugwifsui.com/',
    twitter: 'https://x.com/SuiPugwif',
    telegram: 'https://x.com/SuiPugwif',
    logoUrl: '',
    name: 'Pugwif',
    symbol: 'PUGWIF',
    decimals: 9,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'sui-plop',
    symbol: 'PLOP',
    name: 'SUI Plop',
    address:
      '0x1c6cd615ed4c42a34977212a3407a28eec21acc572c8dbe7d0382bf0289a2590::plop::PLOP',
    pairAddress:
      '0x017dbb023a5c893cc263fc4375879354c442f69b27712ec885388acbc39219a2',
    website: 'https://plopsui.com',
    twitter: 'https://x.com/PlopSui',
    telegram: 'https://t.me/plopsuiportal',
    decimals: 6,
    narratives: ['Meme'],
  },

  {
    coingeckoId: 'pou-on-sui',
    symbol: 'POU',
    name: 'Pou On Sui',
    address:
      '0x2a4ff823f90bf8193dc801bbba1bae8676d91e1eb5cc3ed7b1ff35f5d7413a48::pou::POU',
    pairAddress:
      '0xe84eb397112188c0c0bf9f5a908dfeb0dfb4783befea64ec5b781ac888f67d0c',
    website: 'https://pouonsui.com',
    twitter: 'https://x.com/Poucoinsui',
    telegram: 'https://t.me/pouonsui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0xe68de9dcefed8f7b24183fb3f990f0cebffb1df001bddc4cde2d75187b369c7f::plankz::PLANKZ',
    coingeckoId: '',
    pairAddress:
      '0x424fd343ab3eb26867118bd1f26511dd218fdef237c814f8cafc1a285777a7cb',
    website: '',
    twitter: 'https://x.com/PlankzSui',
    telegram: 'https://t.me/PlankzOnSui',
    logoUrl: '',
    name: 'PLANKz',
    symbol: 'PLANKZ',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'pumpkin-token',
    symbol: 'PUMPKIN',
    name: 'PUMPKIN TOKEN',
    address:
      '0x09f1c8f05cb47bbcb61133dd2ef00583720694f41d4f8a61c94467d8f5911a14::pumpkin::PUMPKIN',
    pairAddress:
      '0x439395b92b8990dee3729d3130cc31f97281ee1681aa9f44cdd19896fafe22f8',
    website: 'https://thepumpkintoken.org',
    twitter: 'https://x.com/thepumpkintoken',
    telegram: 'https://t.me/pumpkinsui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suirex',
    symbol: 'REX',
    name: 'suirex',
    address:
      '0xd5fcf6a2947411e145a01e31cf97d43d13d9cd37b7cac2bb3296f7539ebaaf4a::rex::REX',
    pairAddress:
      '0x96ec660396e8845f06c134fc3121ad4932fe31b2dc303a71a6b15bc25027b84d',
    website: 'https://suirex.xyz/',
    twitter: 'https://x.com/suirex_',
    telegram: 'https://t.me/suirexportal',
    narratives: ['Meme'],
  },
  {
    address:
      '0x0212c13fa071fcdae9f1f51bc4d820fa9f2396934478758bb278015e7781c154::rocket::ROCKET',
    coingeckoId: '',
    pairAddress:
      '0x744eb8f8ef80f26586894f147ff35c3cd3515f9d0ed5ed894425d43248dcf166',
    website: 'https://app.gohighlevel.com/v2/preview/qs4jHGISNKTAHem7TuQj',
    twitter: 'https://x.com/TeamRocketOnSui',
    telegram: 'https://t.me/TeamRocketSui',
    logoUrl: '',
    name: 'Team Rocket',
    symbol: 'ROCKET',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'rockee-ai',
    symbol: 'ROCK',
    name: 'Rockee AI',
    address:
      '0xb4bc93ad1a07fe47943fc4d776fed31ce31923acb5bc9f92d2cab14d01fc06a4::ROCK::ROCK',
    pairAddress:
      '0xd48c14d90da5c64b4850671f8055b08d829cb62f786c617e342884207143d9c1',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 6,
    narratives: ['AI'],
  },
  {
    coingeckoId: 'ronda-on-sui',
    symbol: 'RONDA',
    name: 'Ronda On Sui',
    address:
      '0xdc9b462697876ff4c680e59b3756ac39a6899cfbc355a6880c60e01c8930b3cc::ronda::RONDA',
    pairAddress:
      '0xa052785be00b4d43e5cd7f133b721a3825eb11df2b4506fab71d4504e18cb9a0',
    website: 'https://rondaonsui.com/',
    twitter: 'https://x.com/rondaonsui?s=21',
    telegram: 'https://t.me/RondaOnSuiportal',
    decimals: 6,
    narratives: ['Others'],
  },
  {
    address:
      '0x3e685970b2ce13e61349177afb4ac2f9698f2a4dc45b5ae7d2fbbd95165e5dae::suilaunch::SUILAUNCH',
    coingeckoId: '',
    pairAddress:
      '0x725a6034ae2ffe56ece729df3b9bfbbbe72e4598dcae40efeb01c3a19a29aa25',
    website:
      'https://suiai.fun/fun/pool/0x12e793566530738f6758f7694b38150b471cf42acf7e1e352d6546b777065174',
    twitter: 'https://x.com/Suilaunchcoin',
    telegram: 'https://t.me/SuiLaunchCoin',
    logoUrl: '',
    name: 'SuiLaunch',
    symbol: 'SUILAUNCH',
    decimals: 6,
    narratives: ['Other'],
    new: true,
  },
  {
    address:
      '0x3519b215d682e40bcc9e1a96164222afd421ddea01e188b52c690ae5121edd5d::siren::SIREN',
    coingeckoId: '',
    pairAddress:
      '0x26adcffceacb9406cc2fea9621ff8c2efd872f71ebc815e27fed1b33fbbadf6a',
    website:
      'https://suiai.fun/fun/pool/0x12e793566530738f6758f7694b38150b471cf42acf7e1e352d6546b777065174',
    twitter: 'https://x.com/SuiSiren_',
    telegram: 'https://t.me/Sui_Siren',
    logoUrl: '',
    name: 'Sui Siren',
    symbol: 'Siren',
    decimals: 6,
    narratives: ['Other'],
    new: true,
  },
  {
    coingeckoId: 'agent-s',
    symbol: 'S',
    name: 'Agent S',
    address:
      '0xea65bb5a79ff34ca83e2995f9ff6edd0887b08da9b45bf2e31f930d3efb82866::s::S',
    pairAddress:
      '0x1de5cc16141c21923bfca33db9bb6c604de5760e4498e75ecdfcf80d62fb5818',
    website: 'https://agent-s.site/',
    twitter: 'https://x.com/0xAgent_S',
    telegram: 'https://t.me/agentS_portal',
    decimals: 9,
    narratives: ['AI'],
  },
  {
    address:
      '0x35b9488e731b42c8468f17f3ca43e202023548d9a640e6c97cd448c1ab3cf0b2::shart::SHART',
    coingeckoId: '',
    pairAddress:
      '0x24b8582e5f0be1bbe0d18fea64f0a61c022872c0bddf1a3237e0b4428498dc77',
    website: 'https://shartcoin.site/',
    twitter: 'https://x.com/SHARTCOINOFSUI',
    telegram: 'https://t.me/SHARTCOINONSUI',
    logoUrl: '',
    name: 'SHARTCOIN',
    symbol: 'SHART',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'stonefish-ai',
    symbol: 'SAI',
    name: 'STONEFISH AI',
    address:
      '0x5b40e84bd4b428fb7ae15a4a36ed1527d1b7bfaeae21855a499714175d215c2e::sai::SAI',
    pairAddress:
      '0x7c7ffaedb6d8a31618565f74638a9017b24cd74e1affb5ceca2640e02972c8ce',
    website: 'https://stonefishai.com/',
    twitter: 'https://x.com/stonefishai?t=gvXIsAtCfcdCZ9Q8M3I8Fw&s=09',
    telegram: 'https://t.me/stonefishAI',
    decimals: 6,
    narratives: ['AI'],
  },

  {
    coingeckoId: 'scallop-2',
    symbol: 'SCA',
    name: 'Scallop',
    address:
      '0x7016aae72cfc67f2fadf55769c0a7dd54291a583b63051a5ed71081cce836ac6::sca::SCA',
    pairAddress:
      '0x1341467c5aca847aff459e07d6a777a6fbf7aa7b71ffd66cc2f4bdfda162add4',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'sacabam',
    symbol: 'SCB',
    name: 'Sacabam',
    address:
      '0x9a5502414b5d51d01c8b5641db7436d789fa15a245694b24aa37c25c2a6ce001::scb::SCB',
    pairAddress:
      '0xf4915810e13a066abed9d2f7b658d871e6deac7b96cf3b66117ea4e6628aa526',
    website: 'https://sacabam.fun/',
    twitter: 'https://twitter.com/sacabamfun',
    telegram: 'https://t.me/sacabam',
    decimals: 5,
    narratives: ['Meme'],
  },

  {
    address:
      '0x6f2071362016c6db900dfc95feba3169fa1ca006d097646ca6a522549873c6aa::suichu::SUICHU',
    coingeckoId: '',
    pairAddress:
      '0x7bd1c6dfbcd75301d574a226b1e05316cfc647f88082e3b94c57ed736a74916c',
    website: 'https://suikachucoin.com/',
    twitter: 'hhttps://x.com/SuikachuMeme',
    telegram: 'https://t.me/Suikachusui',
    logoUrl: '',
    name: 'SUIKACHU',
    symbol: 'SUICHU',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x63c2b02327175e1ef10aab83542d0549a4c054024825caae07021c92c9692f26::suki::SUKI',
    coingeckoId: '',
    pairAddress:
      '0x5f7b7647c37c0d58c1809babb6ab6bb279922f41af8623e9ff8da24d5aa04333',
    website: 'https://sukionsui.uwu.ai/#',
    twitter: 'https://x.com/sukionsui',
    telegram: 'https://t.me/SukiOnSuiPortal',
    logoUrl: '',
    name: 'SUKI ON SUI',
    symbol: 'SUKI',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x38bc7cbb7d2f478427fbc495408910ee733a4e3b8050936aec75acb9b8f42dfc::sola::SOLA',
    coingeckoId: '',
    pairAddress:
      '0xbda183c33f0055f865f642f3d848e378729893d31a6615add99d25bc21394d62',
    twitter: 'https://x.com/Sola_AIDOL',
    telegram: 'https://t.me/Sola_AIDOL',
    website: 'https://www.youtube.com/@Sola_AIDOL',
    logoUrl: '',
    name: 'Sola by SuiAI',
    symbol: 'SOLA',
    decimals: 6,
    narratives: ['AI'],
    new: true,
  },
  {
    address:
      '0x20d97b22c2f49c2848a9712cdf86ee734a344b89e03b755c663512cee91d1c91::suiffy::SUIFFY',
    coingeckoId: '',
    pairAddress:
      '0xa8bea2beb79f070e36ede281100f46f98654b998c22012cb592ca6b4e16b2fdd',
    twitter: 'https://x.com/suicoffeebot',
    telegram: 't.me/suiffysuicoffeebot',
    website: 'https://suiffy.wal.app/',
    logoUrl: '',
    name: 'Sui Coffeebot',
    symbol: 'SUIFFY',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'scuba-dog',
    symbol: 'SCUBA',
    name: 'Scuba Dog',
    address:
      '0x9e6d6124287360cc110044d1f1d7d04a0954eb317c76cf7927244bef0706b113::SCUBA::SCUBA',
    pairAddress:
      '0xa8593858a7dfb15abd4c995ed7f2ab2ffc4f18a6d953e982361bd0c7fa595463',
    website: 'https://www.scubadogsui.com',
    twitter: 'https://x.com/Scuba_Sui',
    telegram: 'https://t.me/ScubaSui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suilend',
    symbol: 'SEND',
    name: 'Suilend',
    address:
      '0xb45fcfcc2cc07ce0702cc2d229621e046c906ef14d9b25e8e4d25f6e8763fef7::send::SEND',
    pairAddress:
      '0x37073ee2c4f1b2f6f9dce3d736f4954a2ac92c2caadbb845cdab6f360e97a814',
    website: 'https://suilend.fi/',
    twitter: 'https://x.com/suilendprotocol',
    telegram: '',
    decimals: 6,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'shork',
    symbol: 'SHORK',
    name: 'Shork',
    address:
      '0x80a4b8e2fbc6b5741a301e2295e431c3ca54ad7ff0b20291c433c05cb53b35ce::shork::SHORK',
    pairAddress:
      '0xe432a72c0921c8d75160eba6da7723fd7f7e1a74342d12e9fdd42d975713b51f',
    website: 'https://www.shork.click/',
    twitter: 'https://x.com/Shork_SUI',
    telegram: 'https://t.me/shork_sui',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'sroomai-dao',
    symbol: 'SHR0',
    name: 'SroomAI DAO',
    address:
      '0x16ab6a14d76a90328a6b04f06b0a0ce952847017023624e0c37bf8aa314c39ba::shr::SHR',
    pairAddress:
      '0x871cbd82b0f2301598930b14fb53e5a199f3d17de109a3554289c0248f48bd85',
    website: 'https://suidaos.com',
    twitter: 'https://x.com/sroomaidao',
    telegram: 'https://t.me/suidaos',
    decimals: 9,
    narratives: ['AI'],
  },
  {
    address:
      '0x7bd673d1b980fc2f1c922f91395c325561a675fc2f349c8ffcff7d03bdbeadc8::boost::BOOST',
    coingeckoId: '',
    pairAddress:
      '0x3d257271b793f24e79ff7018529dc6c511679232ee2753b3636734aef563516e',
    twitter: 'https://x.com/suibooster',
    telegram: 'https://t.me/sui_booster',
    website: 'https://suibooster.wal.app/',
    logoUrl: '',
    name: 'Sui Booster DAO',
    symbol: 'BOOST',
    decimals: 6,
    narratives: ['Others'],
    new: true,
  },
  {
    address:
      '0x3766e534b5dc6cdb7defd998debf19f72565f4a7b8224e36b050f690b71a8819::boom::BOOM',
    coingeckoId: '',
    pairAddress:
      '0xae74d149e064bdd2ca0fb3f9dc32157d8653457875618eb6e75054a3949e9043',
    website: 'https://boombotsai.on-fleek.app/',
    twitter: 'https://x.com/BoomBotsOnSui',
    telegram: 'https://t.me/BOOMBOTSONSUIPORTAL',
    logoUrl: '',
    name: 'Boom Bots AI',
    symbol: 'BOOM',
    decimals: 6,
    narratives: ['Meme', 'AI'],
    new: true,
  },
  {
    coingeckoId: '',
    name: 'Sizu',
    symbol: 'SIZU',
    address:
      '0xa7b184cdd17cc2753b9aa2d3c1a4fcb1ae7e2fd8670ee42180369343bdac9c08::sizu::SIZU',
    pairAddress:
      '0x09bd43d6ae5f2d3c13350602136415d95554427e39f83f64f08e32539a6688d4',
    website: 'https://sizu-meme.com/',
    twitter: 'https://x.com/Sizu_meme',
    telegram: 'https://t.me/+HRgrEp22JAFjZThi',
    logoUrl: '',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0x048880dfea82155af55cbd5e1889efd10b5730eb092c334f909e08fb59b94290::stake::STAKE',
    coingeckoId: '',
    pairAddress:
      '0xc57c1cebeb4f72a3acaf9bf4b8faab5aa3c0580464fb3c2485b652366dbec1e8',
    twitter: 'https://x.com/stakedotsui',
    telegram: 'https://t.me/stakecoinss',
    website: 'stakecoin.wal.app',
    logoUrl: '',
    name: 'Stakecoin',
    symbol: 'STAKE',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x6dd439dee053557b3dd340287a4b81099b3e729cb48fbdae726dd2dff82736c3::slove::SLOVE',
    coingeckoId: 'slove',
    pairAddress:
      '0x7249180ebceeaa0700c4f4851507e8c357930bb06f3dba041b8816c39d88e625',
    website: 'https://playseedgo.com/',
    twitter: 'https://x.com/SeedCombinator',
    telegram: 'https://t.me/seedupdates',
    name: 'SLOVE',
    symbol: 'SLOVE',
    decimals: 6,
    narratives: ['Others'],
  },

  {
    address:
      '0x2fbed1da424da88f0bd56fab2d1a29a67c06bc1dc72c86428b40a1e5ce312941::shock::SHOCK',
    coingeckoId: '',
    pairAddress:
      '0x0fdb25715e3c518feb62feeec2164075cd5a2bed54d82f21b822ad00dcae1207',
    website: 'https://www.aquashock.net/',
    twitter: 'https://x.com/AquaShockonSui',
    telegram: 'https://t.me/AquaShock',
    logoUrl: '',
    name: 'Aqua Shock',
    symbol: 'SHOCK',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0x5ce7473cb090f37e3dd073931b512a1c2a7d635abdeb4d7cc8460da95d7dbd90::sog::SOG',
    coingeckoId: 'seal-dog',
    pairAddress:
      '0x135a191d23e3d061b6066ef88b388796f69838f992e11349eb4b5b5e040f6703',
    website: 'https://www.sealdogsui.com/',
    twitter: 'https://x.com/sealdogsui',
    telegram: 'https://t.me/sogcult',
    name: 'Seal Dog',
    symbol: 'SOG',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'sonic-snipe-bot',
    symbol: 'SONIC',
    name: 'Sonic Snipe Bot',
    address:
      '0x555f3aa7c9c60ca67f906557777fab78fd70a302da7d66a23fcb4f8808d15010::sonic::SONIC',
    pairAddress:
      '0x3353c6ae880e383a7136b444d0af23eda0ca5ebc0d3a6dc48947f5870c5565ff',
    website: 'https://www.sonicsnipebot.com/',
    twitter: 'https://x.com/SonicSnipeBot',
    telegram: 'https://t.me/SonicSnipePortal',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    coingeckoId: 'splash-ai',
    symbol: 'SPLASH',
    name: 'SPLASH AI',
    address:
      '0x965149aec4e1e321ce887c4c2f199086ad78fd366f4ed37c86bf768638468a55::splash::SPLASH',
    pairAddress:
      '0x6a8e33474c5bff5925de3575e14565d9c848241266aaf9703d5cb5c431152add',
    website: 'https://splashai.io/',
    twitter: 'https://x.com/suisplashai',
    telegram: 'https://t.me/SuiSplashAi',
    decimals: 6,
    narratives: ['AI'],
  },

  {
    coingeckoId: 'seapad',
    symbol: 'SPT',
    name: 'SeaPad',
    address:
      '0xb779486cfd6c19e9218cc7dc17c453014d2d9ba12d2ee4dbb0ec4e1e02ae1cca::spt::SPT',
    pairAddress:
      '0x201853fab5a88cd0b77408347f60d8b755b9a57a64b30b9aae5fa1568f61c98d',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'squidonsui',
    symbol: 'SQID',
    name: 'SquidOnSui',
    address:
      '0x4f83caf6626d0f931ac519028e62a8f9d9fc8fdf62da09489023940fd0bba882::sqid::SQID',
    pairAddress:
      '0x9172904ac5f8d58dbb4acc9403a4398ffdc7fde6f66e6c6a7f9977ea58caa3f7',
    website: 'https://squidonsui.xyz',
    twitter: 'https://x.com/squidcoinsui?s=21',
    telegram: 'https://t.me/squidonsui',
    decimals: 6,
    narratives: ['Meme'],
  },

  {
    coingeckoId: 'suitard',
    symbol: 'STD',
    name: 'suitard',
    address:
      '0x2cddfc6d4fc855917e990e71cd122b1ee8098aa890186ee15a84524ed17cd8c9::suitard::SUITARD',
    pairAddress:
      '0x960d673274597d9ac471044d4a94740dacd9e5039217397ea44cd9f994ff55de',
    website: 'https://www.suitard.com/',
    twitter: 'https://x.com/retardSuitizen',
    telegram: 'https://t.me/suitard',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'sui-universe',
    symbol: 'SU',
    name: 'Sui Universe',
    address:
      '0x53a63d7202fc83b39acb437e0f99aae0a73a96506ccfb1d1073710cdcefc26a2::su::SU',
    pairAddress:
      '0x1a81b6f1174bc028954ed546f9b8c87fb5893df32e1a8203ea85407ec85e1b35',
    website: 'https://suiuniverse.com/',
    twitter: 'https://x.com/suiuniversal',
    telegram: 'https://t.me/+eCaHK9mW-EliOWY0',
    decimals: 6,
    narratives: [null],
  },
  {
    coingeckoId: 'suiai',
    symbol: 'SUAI',
    name: 'SuiAI',
    address:
      '0xbc732bc5f1e9a9f4bdf4c0672ee538dbf56c161afe04ff1de2176efabdf41f92::suai::SUAI',
    pairAddress:
      '0x7852612f5bf73613021f17353985fc186b3b224139c6a2576239132ba5a33b66',
    website: 'https://suiai.fun',
    twitter: 'https://x.com/SuiAIFun',
    telegram: 'https://t.me/SuiAiGroup',
    isPartner: true,
    decimals: 6,
    narratives: ['AI'],
  },

  {
    coingeckoId: 'suia',
    symbol: 'SUIA',
    name: 'SUIA',
    address:
      '0x1d58e26e85fbf9ee8596872686da75544342487f95b1773be3c9a49ab1061b19::suia_token::SUIA_TOKEN',
    pairAddress:
      '0xbcf18ddb425dfc3207d57b83e8d105ef11b502a1b6072a8026e3716ac535b035',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    coingeckoId: 'sui-agents',
    symbol: 'SUIAI',
    name: 'SUI Agents',
    address:
      '0xdc083ed335b5fe342cca1d5887530336246ed7d80da6bcecbc7c1becb88074ee::mycoin::MYCOIN',
    pairAddress:
      '0xb18e77c704828ca1df2940ddbd8176b330724a36bb86cabb1fe67dee16b33199',
    website: 'https://suiagents.ai',
    twitter: 'https://x.com/SUI_agents',
    telegram: 'https://t.me/SuiAgents',
    decimals: 9,
    narratives: ['AI'],
  },
  {
    coingeckoId: 'suiba-inu',
    symbol: 'SUIB',
    name: 'Suiba Inu',
    address:
      '0xed4504e791e1dad7bf93b41e089b4733c27f35fde505693e18186c2ba8e2e14b::suib::SUIB',
    pairAddress:
      '0xf0609f51d600c654cf78cd6d84f9849d33b52e716651815d0003bf7601bbded0',
    website: 'https://www.suibacoin.com/',
    twitter: 'https://x.com/suibaonsui',
    telegram: 'https://t.me/SuibaPortal',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'sui-cat',
    symbol: 'SUICAT',
    name: 'SUI CAT',
    address:
      '0x0bffc4f0333fb1256431156395a93fc252432152b0ff732197e8459a365e5a9f::suicat::SUICAT',
    pairAddress:
      '0x03ab14ad1ad328ed23171f33c1bf3560b6598d69502da62207487c5be5972f00',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suicy-the-seal',
    symbol: 'SUICY',
    name: 'SUICY the Seal',
    address:
      '0x8989c726bf1ea8736919e41938f3801e286bc71d9612bfe250703232a375eaab::suicy::SUICY',
    pairAddress:
      '0x8ebad96550ab6ccba7d0380731e0cc4676caa060f76d3e085d33438f64615d9c',
    website: 'https://suicy.xyz/',
    twitter: 'https://x.com/sui_icy',
    telegram: 'https://t.me/Sui_icy',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suidefai-by-suiai',
    symbol: 'SUID',
    name: 'SUIDeFAI by SuiAI',
    address:
      '0x36ed4566e2286bca21d01ea1a8037ae4da72bd0b0188d6a63b160daeb10febcd::suid::SUID',
    pairAddress:
      '0x635e381faa0506693a6fed11fdb3d23de4a172779deb6b21803eed2d90c5a8f3',
    website: 'https://www.suidef.ai/',
    twitter: 'https://x.com/suidef_ai',
    telegram: 'https://t.me/suidef_ai',
    decimals: 6,
    narratives: ['DeFi'],
  },

  {
    coingeckoId: 'suieet',
    symbol: 'SUIEET',
    name: 'SUIEET',
    address:
      '0xc0967b3bd5cce1382bd8e511af06a34794a6efd2726e680b0711e19393fe9023::suieet::SUIEET',
    pairAddress:
      '0xc6d2c630e6328f06b0658d1a8a63916dd681e1053c4fc8b50b53d6f795bc8b21',
    website: 'https://suieet.xyz/',
    twitter: 'https://x.com/Suieet_?t=9aUGd83yneimHbFcW1gqhA&s=09',
    telegram: 'https://t.me/Suieetcommunity',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suijak',
    symbol: 'SUIJAK',
    name: 'Suijak',
    address:
      '0xd9773016f31a1216fb0a1e0b0937f09687663807e8cb8a19ba5a12f2f5dcab88::suijak::SUIJAK',
    pairAddress:
      '0x127bd40c39ca93dbdeec255d559b3d5d061fb98ab8eeade5fd68e71d21217647',
    website: 'https://suijak.lol/',
    twitter: 'https://x.com/Sui_jak',
    telegram: 'https://t.me/Suijak',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suilama',
    symbol: 'SUILAMA',
    name: 'Suilama',
    address:
      '0x5a4f64079daed04d923c93f3ac4ee04b637e5b3ea2db87d591981c1049508a27::suilama::SUILAMA',
    pairAddress:
      '0xc64bdfbb8755677835c65048c5cd905f0e4847cd3a475d74dc7ea7478fb3ed14',
    website: 'https://suilama.com',
    twitter: 'https://x.com/SuilamaToken',
    telegram: 'https://t.me/SuilamaToken',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suiman',
    symbol: 'SUIMAN',
    name: 'Suiman',
    address:
      '0xa8b69040684d576828475115b30cc4ce7c7743eab9c7d669535ee31caccef4f5::suiman::SUIMAN',
    pairAddress:
      '0x127b7cf262607a0bc6e1035bed13883d342b0a0c04ce60fc51b5ffbdd03a6983',
    website: 'https://www.suiman.xyz/',
    twitter: 'https://x.com/SuimanFanPage',
    telegram: 'https://t.me/SuimanPortal',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'sui-monster',
    symbol: 'SUIMON',
    name: 'Sui Monster',
    address:
      '0xc0ba93a810adb498900c82bb6f7c16ca3046dfa7b6f364ec985595fdeb1ee9ad::suimon::SUIMON',
    pairAddress:
      '0x1c009f357e4a5edc303970dee3d79b9d7f5369b0721eab54c6c141bd1798dc2c',
    website: 'https://suimonster.com',
    twitter: 'https://x.com/suimon_',
    telegram: 'https://t.me/suimonster_land',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suipad',
    symbol: 'SUIP',
    name: 'SuiPad',
    address:
      '0xe4239cd951f6c53d9c41e25270d80d31f925ad1655e5ba5b543843d4a66975ee::SUIP::SUIP',
    pairAddress:
      '0x20739112ab4d916d05639f13765d952795d53b965d206dfaed92fff7729e29af',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    coingeckoId: 'suishicat',
    symbol: 'SUISHI',
    name: 'Suishicat',
    address:
      '0xebb4eb552f807a28a1601e804ccaf91796ddc46407ba1b07381333111ed29d46::suishi::SUISHI',
    pairAddress:
      '0xc4daa0db85a9c5c1dfe069f91e18b3d2cdf17d8efea9caec767030fadd3ea61b',
    website: 'https://suishicat.com',
    twitter: 'https://x.com/suishicat_sui',
    telegram: 'https://t.me/SuishicatPortal',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'suite-2',
    symbol: 'SUITE',
    name: 'Suite',
    address:
      '0x818e9258be113f30316dedd24703df7d2ba27eab925e1bf744166d71c487342a::suite::SUITE',
    pairAddress:
      '0xd22e1b12d805daa65f2eadb4db71469be41202b0b644b4a46a46860ae6b68566',
    website: 'https://www.suite.tech',
    twitter: 'https://x.com/Suite_Token',
    telegram: 'https://t.me/PortalSuite',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    coingeckoId: 'sui-trump',
    symbol: 'SUITRUMP',
    name: 'SUI TRUMP',
    address:
      '0xdeb831e796f16f8257681c0d5d4108fa94333060300b2459133a96631bf470b8::suitrump::SUITRUMP',
    pairAddress:
      '0x2c2bbe5623c66e9ddf39185d3ab5528493c904b89c415df991aeed73c2427aa9',
    website: 'https://sui-trump.com/',
    twitter: 'https://x.com/SUITRUMPCOIN',
    telegram: 'https://t.me/+cFvZCZYolVFiNDk1',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0x1b16598b6c00ff66939d14d72a06b49b2a80578a76e3cd813a7be0a69818f03f::uicide::UICIDE',
    coingeckoId: '',
    pairAddress:
      '0xd1a59dd980f830c56adcb346ec1c589145f23b6c270ce12e9221555138f155ab',
    website: 'https://suicidesocialclub.io/',
    twitter: 'https://x.com/SSCONSUI',
    telegram: 'https://t.me/SUICIDESOCIALCLUBSUIPORTAL',
    logoUrl: '',
    name: 'SUICIDE SOCIAL CLUB',
    symbol: 'UICIDE',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    address:
      '0x186b548d559adca153757c6cf1ce60cb859dda378a7f242c18706cdbbcca933a::stan::STAN',
    coingeckoId: '',
    pairAddress:
      '0x3223b62db95e6e677cc00bd0c497e39f27721d0b5d20340a667af15f9724277e',
    website: 'https://suistan.com/',
    twitter: 'https://x.com/sui_stan',
    telegram: 'https://t.me/suistan',
    logoUrl: '',
    name: 'Sui Stan',
    symbol: 'STAN',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: '',
    symbol: 'suiUSDT',
    name: 'Tether by Sui Bridge',
    address:
      '0x375f70cf2ae4c00bf37117d0c85a2c71545e6ee05c4a5c7d282cd66a4504b068::usdt::USDT',
    pairAddress:
      '0x0bd95d012d60190a6713ae51f2d833b24ae70c5fb07fcfb41db40f25549878b1',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 6,
  },
  {
    coingeckoId: 'super-suiyan',
    symbol: 'SUIYAN',
    name: 'Super Suiyan',
    address:
      '0xe0fbaffa16409259e431b3e1ff97bf6129641945b42e5e735c99aeda73a595ac::suiyan::SUIYAN',
    pairAddress:
      '0x4c5bd926a3864b0cca1515aef81170e49c2eaae9c24e5517189b24a2939f4a8f',
    website: 'https://www.suiyancoin.com',
    twitter: 'https://x.com/supersuiyan',
    telegram: 'https://t.me/SUPERSUIYAN',
    decimals: 6,
    narratives: ['Meme'],
  },

  {
    coingeckoId: '',
    name: 'SuiBets',
    symbol: 'SBets',
    address:
      '0x6a4d9c0eab7ac40371a7453d1aa6c89b130950e8af6868ba975fdd81371a7285::sbets::SBETS',
    pairAddress:
      '0x7d8d95ccb870cc2ec63997815726e15722ea128d34a2737750dfb52c3a0afd68',
    website: '',
    twitter: 'https://x.com/Sui_Bets/',
    telegram: 'https://t.me/Sui_Bets',
    logoUrl: '',
    decimals: 9,
    narratives: ['Others'],
  },
  {
    address:
      '0xa224eea12f683adac14ca236dc8d471061fcfc7de8635ddb72b98a02897e78e1::suidog::SUIDOG',
    coingeckoId: '',
    pairAddress:
      '0x92fdc770fed037faa3cfe2d8fb049f6390bbdac314bb943b27719a5686f0fdf0',
    website: 'https://suidog.fun/',
    twitter: 'https://x.com/Sui_Dogg',
    telegram: 'https://t.me/suidog_cto ',
    logoUrl: '',
    name: 'SuiDog',
    symbol: 'SUIDOG',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x832ad32dfdda557a32bd491a681fb36c043fbdefa5f888ad9d6e4349f551624c::suipreme::SUIPREME',
    coingeckoId: '',
    pairAddress:
      '0xaa8ba8eb8dcbe4207e13f8aefbfd54373d9868a7ef281e383534888854f3129e',
    twitter: 'https://x.com/Sui_Preme',
    telegram: 'https://t.me/SuipremeMeme',
    website: 'https://suipreme.online/',
    logoUrl: '',
    name: 'Suipreme',
    symbol: 'SUIPREME',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'tardi',
    symbol: 'TARDI',
    name: 'Tardi',
    address:
      '0x4cf08813756dfa7519cb480a1a1a3472b5b4ec067592a8bee0f826808d218158::tardi::TARDI',
    pairAddress:
      '0x488411c4bc8646aaa865b5e778392d1498ba47dfdc625b6ffc70a68f52d9ff20',
    website: 'https://tardi.org/',
    twitter: 'https://x.com/Tardionmoon',
    telegram: 'https://t.me/tardionmoon',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'tism',
    symbol: 'TISM',
    name: 'TISM',
    address:
      '0x6612c8419c70a706612e154ffcc0ef21b3fec6e4008b4b775ceae4e894d3484d::tism::TISM',
    pairAddress:
      '0xf3c431d524cbc6fd11bd12de8849f1d7bb001a12f4facb84bb9f3ba4979192b8',
    website: 'https://gottism.com/',
    twitter: 'https://x.com/got__tism',
    telegram: 'http://t.me/got_tism',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0xc5b61b1e1f7f88511c9c0c6f475f823c66cc4e2d39a49beb6777059710be8404::toilet::TOILET',
    coingeckoId: '',
    pairAddress:
      '0x800be221bc62f1e2c2923f502ea97d3660bf563887ef84dc7eeed241d4dd5e34',
    website: 'https://toiletdust.com/',
    twitter: 'https://x.com/toiletdustsui',
    telegram: 'https://t.me/ToiletDustonSui',
    name: 'Toilet Dust',
    symbol: 'TOILET',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'tubbi',
    symbol: 'TUBBI',
    name: 'Tubbi',
    address:
      '0x06106c04a586f0f003fcdf7fb33564f373680ddcc1beb716fd22e2952e227eb3::tubbi::TUBBI',
    pairAddress:
      '0x8804e54e0e19a1fb2694102ae79dc42aafe36a669cd8ea659fce557ad93e7160',
    website: 'https://tubbi.meme/',
    twitter: 'https://x.com/memetubbi',
    telegram: 'https://t.me/tubbimeme',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'turbos-finance',
    symbol: 'TURBOS',
    name: 'Turbos Finance',
    address:
      '0x5d1f47ea69bb0de31c313d7acf89b890dbb8991ea8e03c6c355171f84bb1ba4a::turbos::TURBOS',
    pairAddress:
      '0x2c6fc12bf0d093b5391e7c0fed7e044d52bc14eb29f6352a3fb358e33e80729e',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'typus',
    symbol: 'TYPUS',
    name: 'Typus',
    address:
      '0xf82dc05634970553615eef6112a1ac4fb7bf10272bf6cbe0f80ef44a6c489385::typus::TYPUS',
    pairAddress:
      '0xa467d2dee561bca8e7b3f5f1622f0fa1cb672befae69a0d1b6dced941c858c4e',
    website: 'https://typus.finance/',
    twitter: 'https://twitter.com/TypusFinance',
    telegram: 'https://t.me/typusfinance',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    coingeckoId: 'uni',
    symbol: 'UNI',
    name: 'Uni',
    address:
      '0xaf9e228fd0292e2a27b4859bc57a2f3a9faedb9341b6307c84fef163e44790cc::uni::UNI',
    pairAddress:
      '0xc905c9263609d6ea700ff6267978107336beab3df377d58a1c53f6e25b7630ee',
    website: 'https://unicoinsui.com/',
    twitter: 'https://x.com/UniSuiCoin',
    telegram: 'https://t.me/unisuicoin',
    decimals: 9,
    narratives: ['Meme'],
  },

  {
    address:
      '0x356a26eb9e012a68958082340d4c4116e7f55615cf27affcff209cf0ae544f59::wal::WAL',
    coingeckoId: 'walrus-2',
    pairAddress:
      '0x72f5c6eef73d77de271886219a2543e7c29a33de19a6c69c5cf1899f729c3f17',
    website: 'https://www.walrus.xyz/',
    twitter: 'https://x.com/walrusprotocol',
    telegram: '',
    name: 'Walrus',
    symbol: 'WAL',
    decimals: 9,
    narratives: ['DeFi'],
  },
  {
    address:
      '0x150a3765f43bee5e67f8faa04ad8802aab8fe8656d270198b55f825d4816cffe::wet::WET',
    coingeckoId: '',
    pairAddress:
      '0x0bb40f4a0c74231e353cad444f95169eadeb76fe803f656140ebd360f5029095',
    website: 'https://wetcoin.fun/',
    twitter: 'https://x.com/WET_sui',
    telegram: 'https://t.me/WetOnSuiSafeguard',
    logoUrl: '',
    name: 'WET',
    symbol: 'WET',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x1ef589de086af858d0d6bd690b971eb4fdfb658d728d063e4e264a97ea1799f6::wagmi::WAGMI',
    coingeckoId: '',
    pairAddress:
      '0xe7cbdb1c5faa32e58974f73118f36e1fa48ecec56b338f79ea5742bcdba48f18',
    twitter: 'https://x.com/WagmiSui_',
    telegram: 'https://t.me/WagmiSui_Portal',
    website: 'https://www.wagmisui.com/',
    logoUrl: '',
    name: 'We All Gonna It',
    symbol: 'WAGMI',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'water-on-sui',
    symbol: 'WATER',
    name: 'Water on Sui',
    address:
      '0xb713342104cd25efe0333e481d1caf2c3650b258ec3f3a0b3f6765cd3582624b::water::WATER',
    pairAddress:
      '0xde594877684a18312442edc36b1ce918e92a55bad02f426948578533d4bb699a',
    website: 'https://www.watersui.xyz/',
    twitter: 'https://x.com/SuiWater_',
    telegram: 'https://t.me/wateronsuiportal',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0x4db126eac4fa99207e98db61d968477021fdeae153de3b244bcfbdc468ef0722::wsb::WSB',
    coingeckoId: '',
    pairAddress:
      '0x886515dd7de40f038e3c7500f3399e3edb199a3368bf443d768ba8759319e78c',
    website: 'https://www.zerotech.ai/',
    twitter: 'https://x.com/0xWSB',
    telegram: 'https://t.me/WSBAgentZeroPORTAL',
    logoUrl: '',
    name: '0xWSB on SUI',
    symbol: 'WSB',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    coingeckoId: '',
    symbol: 'wBTC',
    name: 'Sui Bridged wBTC',
    address:
      '0xaafb102dd0902f5055cadecd687fb5b71ca82ef0e0285d90afde828ec58ca96b::btc::BTC',
    pairAddress:
      '0xd7d53e235c8a1db5e30bbde563053490db9b876ec8752b9053fee33ed845843b',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 8,
  },
  {
    coingeckoId: 'wewe-2',
    symbol: 'WEWE',
    name: 'WEWE',
    address:
      '0xb5b603827d1bfb2859200fd332d5e139ccac2598f0625de153a87cf78954e0c4::wewe::WEWE',
    pairAddress:
      '0xa1aed8a0df6c9c65e3bdda376a27762cc3ed66ef5f2bac4fb3604e01050bef3f',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: '',
    symbol: 'wUSDT',
    name: 'Portal from Eth',
    address:
      '0xc060006111016b8a020ad5b33834984a437aaa7d3c74c18e09a95d48aceab08c::coin::COIN',
    pairAddress:
      '0xc8d7a1503dc2f9f5b05449a87d8733593e2f0f3e7bffd90541252782e4d2ca20',
    website: '',
    twitter: '',
    telegram: '',
    decimals: 6,
  },
  {
    address:
      '0xd3f7ea1fa9beeaa415777700b176900a77358f830596aa64330668ba98c7abb8::water::WATER',
    coingeckoId: '',
    pairAddress:
      '0xa98be069b823973f6f35acf39b39d198359672c3804b8247b5513efeb83aac0b',
    website: 'https://watersui.com/',
    twitter: 'https://x.com/wateronsuii',
    telegram: 'https://t.me/wateronsui',
    logoUrl: '',
    name: 'Water',
    symbol: 'WATER',
    decimals: 9,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x0e838d4428e5ffe64d6d8dc74b36525f9e5ee16afbdba14115001b707697ff52::zaza::ZAZA',
    coingeckoId: '',
    pairAddress:
      '0xa9f7d963812dc03d1ca2bbde97839eea5f7b550bc32451b8d83aed75052912e2',
    twitter: 'https://x.com/zazasui_',
    telegram: 'https://t.me/ZAZASui_Portal',
    website: 'https://suizaza.website/',
    logoUrl: '',
    name: 'SUI ZAZA',
    symbol: 'ZAZA',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x8b6e2ca7bafe1f0144dea2ea167abc614de69e73c4acb11d1bf8d90fcb2aeebc::zengar::ZENGAR',
    coingeckoId: '',
    pairAddress:
      '0x9773de9af68e07dc46e5a058ce09f4d4a1f21af90bb035f848ce98f4ea9aa4e3',
    twitter: 'https://x.com/zengarsui',
    telegram: 'https://t.me/zengarsui',
    website: 'https://zengarsui.com/',
    logoUrl: '',
    name: 'ZENGARR',
    symbol: 'ZENGARR',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'zenfrogs',
    symbol: 'ZEN',
    name: 'ZenFrogs',
    address:
      '0x2665dc784c7ff17fddba2442b36cb8b2bbc8adfa9fe08794fd941d80ef2758ec::zen::ZEN',
    pairAddress:
      '0x3bfc4679d2a17bbb4e6f20b8d52336d9f851de1e2bfb17ed2927a526d07afbaa',
    website: 'https://zenfrogs.com',
    twitter: 'https://x.com/zen_frogs',
    telegram: 'https://t.me/zenfrogs',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0x7b9549f9e76b72899d755f13d57cc11cf519120d50ac900a5d1cfb2959de0e1e::zizu::ZIZU',
    coingeckoId: '',
    pairAddress:
      '0x0747cf93707b564c0f84ee32f8254a412af776eaace037f9333731f81c8d8ad3',
    website: '',
    twitter: 'https://x.com/Zizu_sui',
    telegram: 'https://t.me/zizuofc',
    logoUrl: '',
    name: 'Zizu',
    symbol: 'ZIZU',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0x4222c0b90705626144a173c0284b8aad1fd14eee41f837d4bad92c1eabe8f2a5::z::Z',
    coingeckoId: '',
    pairAddress:
      '0x77e56466a779e63f3a1e6dd363b1b5b839fd5dacc8d2ddbbfe7629af9e47984e',
    website: 'http://www.zimatoken.xyz',
    twitter: 'http://X.com/zimaonsui',
    telegram: 'http://T.me/zimatoken',
    logoUrl: '',
    name: 'ZIMA',
    symbol: 'Z',
    decimals: 6,
    narratives: ['Meme'],
  },
  {
    address:
      '0x603b12df519c36ecc09f7b02154a67d9cbd791426ca44e009a8ca727f3026297::vape::VAPE',
    coingeckoId: '',
    pairAddress:
      '0x39e722a9dbafc7f740850dc3d743c030524be21881f734ffd40ad4370972940f',
    twitter: 'https://x.com/VaporSui',
    telegram: 'https://t.me/vaporsui',
    website: 'https://vaporsui.com/',
    logoUrl: '',
    name: 'VAPOR',
    symbol: 'VAPE',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    coingeckoId: 'grass-3',
    symbol: '$GRASS',
    name: 'GRASS',
    address:
      '0x6ad7368bf6bbe077cfd30adbc07037767596bc922934d2908027f2ab092c7530::grass::GRASS',
    pairAddress:
      '0xd49f5b5dcb1fc455a31f33381605d1ad297b1b8fd244931f76c916ea258a8e33',
    website: 'https://touchgrassnow.xyz/',
    twitter: 'https://x.com/Grass',
    telegram: 'https://t.me/GrassOnSUI',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    coingeckoId: 'walrus-the-tusk',
    symbol: '$TUSK',
    name: 'Walrus the tusk',
    address:
      '0x1fc50c2a9edf1497011c793cb5c88fd5f257fd7009e85a489392f388b1118f82::tusk::TUSK',
    pairAddress:
      '0x27645957e0260f3c5874c4895c11d2adca6b2c3d60ad4afb805acb635dd46f21',
    website: 'https://tuskthewalrus.com/',
    twitter: 'https://x.com/TuskWalrusOnSui',
    telegram: 'https://t.me/tusksui',
    decimals: 9,
    narratives: ['Meme'],
  },
  {
    address:
      '0x9f3fe2015e7144ff7c78304ab0a1f1d90de1c63b83490ef259aee8f0c4e87e69::x1000::X1000',
    coingeckoId: '',
    pairAddress:
      '0xcc4272f591b823ca82ee1bccb30041e3a90fb7c4d59201940ce348016f1c6992',
    website: 'https://sui-fortune-casino.lovable.app/',
    twitter: 'https://x.com/1000xSUI',
    telegram: 't.me/ONETHOUSANDXSUI',
    logoUrl: '',
    name: '1000XSUI',
    symbol: 'X1000',
    decimals: 6,
    narratives: ['Meme'],
    new: true,
  },
  {
    address:
      '0x90f9eb95f62d31fbe2179313547e360db86d88d2399103a94286291b63f469ba::xo::XO',
    coingeckoId: 'xociety',
    pairAddress:
      '0xa0407fca747e4b4b397421ee96e76169147b15b1bb7a48f6c499c618d17a7dab',
    website: 'https://xociety.io/',
    twitter: 'https://x.com/xocietyofficial',
    telegram: 'https://t.me/XOCIETYAnnouncements',
    logoUrl: '',
    name: 'Xociety',
    symbol: 'XO',
    decimals: 9,
    narratives: ['Other'],
    new: true,
  },
]

export const SwapTokensMap = keyBy(SwapTokensList, (_) =>
  _.address.toLowerCase()
)
