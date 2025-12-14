import { CharacterId, Character, StoryScene } from './types';

// 背景圖片資源 (Unsplash) - 確保古風、無現代建築、無雪山
const BG_RAINY_CITY = '/bg_rain.jpg'; // 煙雨濛濛 (序章)
const BG_Desert = 'https://images.unsplash.com/photo-1547235001-d703406d3f17?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; //沙漠
const BG_home = 'https://images.unsplash.com/photo-1561900077-7cb929361d51?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'; //王維家

// ★★★ 已更新路徑：請確保根目錄下有一個名為 image 的資料夾，且裡面有 bg_willow.jpg ★★★
const BG_INN_WILLOW = './image/bg_willow.jpg'; 

const BG_INN_INTERIOR = '/bg_inn.jpg'; // 室內/飲酒 (終章)
const BG_BAD_ENDING = '/bg_bad.jpg'; // 荒涼沙漠 (壞結局)
const BG_GOOD_ENDING = '/bg_good.jpg'; // 陽光/希望/書信 (好結局)
const BG_POEM_SCROLL = '/bg_poem.jpg'; // 紙張/總結

// 新增：現代課室背景 (外篇)
const BG_CLASSROOM = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1932&auto=format&fit=crop'; 

export const CHARACTERS: Record<CharacterId, Character> = {
  [CharacterId.WangWei]: {
    id: CharacterId.WangWei,
    name: '王維',
    avatarUrl: 'https://i.pinimg.com/736x/8a/8a/90/8a8a906c9faabcbecd1c61acaf4022b6.jpg'
  },
  [CharacterId.YuanEr]: {
    id: CharacterId.YuanEr,
    name: '元二',
    avatarUrl: '/yuaner.png' // 如果您也把人物移到了 image 資料夾，請改為 './image/yuaner.png'
  },
  [CharacterId.Player]: {
    id: CharacterId.Player,
    name: '王維', // 玩家扮演王維
    avatarUrl: ''
  },
  [CharacterId.Narrator]: {
    id: CharacterId.Narrator,
    name: '',
    avatarUrl: ''
  },
  // 新增：現代同學角色
  [CharacterId.XiaoMing]: {
    id: CharacterId.XiaoMing,
    name: '小明',
    avatarUrl: 'https://api.dicebear.com/9.x/micah/svg?seed=XiaoMing&backgroundColor=b6e3f4' // 使用線上生成的現代學生頭像，您也可以上載 xiaoming.png 並替換此處
  }
};

export const STORY_SCRIPT: Record<string, StoryScene> = {
  // ==========================================
  // 第一部分：序章 - 複習與道別
  // 教學目標：地點(渭城)、原因(出使安西)、景物(朝雨/柳色)
  // ==========================================
  
  'start': {
    id: 'start',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.Narrator,
    text: '【序章：雨晨】\n\n你扮演唐代詩人王維。過幾天，是你送別摯友元二的日子。',
    choices: [
      { id: 'start_act1', text: '開始故事', nextSceneId: 'intro_quiz_destination', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  // 互動測驗 1 - 目的地 (Where)
  'intro_quiz_destination': {
    id: 'intro_quiz_destination',
    backgroundUrl: BG_home,
    characterId: CharacterId.WangWei,
    text: '（我手裡拿著元二的信...）\n\n元二被皇上派去執行任務，這是一份榮耀，但也充滿挑戰。\n他要去哪裡任職呢？',
    choices: [
      { id: 'q_dest_right', text: '去西邊的「安西都護府」', nextSceneId: 'intro_dest_right', isGrowthMindset: false },
      { id: 'q_dest_wrong', text: '去南邊的「煙雨江南」', nextSceneId: 'intro_dest_wrong', isGrowthMindset: false }
    ],
  },

  'intro_dest_wrong': {
    id: 'intro_dest_wrong',
    backgroundUrl: BG_Desert,
    characterId: CharacterId.WangWei,
    text: '不對喔。信上寫的是去西域邊疆，保護絲綢之路的安全。那裡可是沙漠遍布的地方。',
    choices: [
      { id: 'retry_dest', text: '再想一想', nextSceneId: 'intro_quiz_destination', isGrowthMindset: false }
    ],
  },

  'intro_dest_right': {
    id: 'intro_dest_right',
    backgroundUrl: BG_Desert,
    characterId: CharacterId.WangWei,
    text: '沒錯，就是安西。那裡離長安（西安）有幾千里遠，中間隔著大沙漠。\n這一去，不知何年何月才能再見面。',
    choices: [
      { id: 'next_quiz_loc', text: '思考送別地點...', nextSceneId: 'intro_quiz_location', isGrowthMindset: false }
    ],
  },

  // 互動測驗 2 - 送別地點 (Location)
  'intro_quiz_location': {
    id: 'intro_quiz_location',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '既然他要往西走，我應該在哪裡為他送行，才能表達我最大的心意呢？',
    choices: [
      { id: 'q_loc_right', text: '去「渭城」（咸陽），那是西行的起點', nextSceneId: 'intro_loc_right', isGrowthMindset: false },
      { id: 'q_loc_wrong', text: '就在我家門口揮揮手就好', nextSceneId: 'intro_loc_wrong', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  'intro_loc_wrong': {
    id: 'intro_loc_wrong',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '這可是去安西啊！只在門口送別太隨便了。人們送別西行的朋友，通常都會送到城外很遠的渭城。',
    choices: [
      { id: 'retry_loc', text: '重新決定', nextSceneId: 'intro_quiz_location', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  'intro_loc_right': {
    id: 'intro_loc_right',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '對！渭城是長安往西走的必經之路。出了渭城，就是荒涼的塞外了。\n\n我明早就趕到了客棧等他。',
    choices: [
      { id: 'enter_inn', text: '走進客棧房間', nextSceneId: 'act1_dialogue_1', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  'act1_dialogue_1': {
    id: 'act1_dialogue_1',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.YuanEr,
    text: '（整理著行囊，轉過身來）\n王維兄，時候不早了，我就要出發去安西了。',
    choices: [
      { id: 'c1_reply', text: '回應元二', nextSceneId: 'act1_dialogue_2', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  'act1_dialogue_2': {
    id: 'act1_dialogue_2',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '我知道。路途遙遠又危險，你要多多保重啊。',
    choices: [
      { id: 'c2_next', text: '聽元二說...', nextSceneId: 'act1_location_quiz', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  // 互動節點一：道別地點意義確認（與前面的測驗呼應）
  'act1_location_quiz': {
    id: 'act1_location_quiz',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.YuanEr,
    text: '多謝王維兄特地送到這裡。渭城（咸陽）離長安（西安）也不近。你爲什麼要送我到渭城呢？',
    choices: [
      { 
        id: 'q1_right', 
        text: '這裡是往西走的起點，出了這裡，就要離開我們熟悉的中原了。', 
        nextSceneId: 'act1_location_right', 
        isGrowthMindset: false
      },
      { 
        id: 'q1_wrong', 
        text: '渭城風景優美，我順路過來看看。', 
        nextSceneId: 'act1_location_wrong', 
        isGrowthMindset: false 
      }
    ],
    specialEffect: 'rain'
  },

  'act1_location_wrong': {
    id: 'act1_location_wrong',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.YuanEr,
    text: '（愣了一下）呃... 我看周圍很多送別的人，這裏應該是人們習慣最後送別的地方吧。',
    choices: [
      { id: 'q1_retry', text: '好像是喔', nextSceneId: 'act1_location_right', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  'act1_location_right': {
    id: 'act1_location_right',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.YuanEr,
    text: '（有些感傷）出了陽關，往西走就真的是完全陌生的世界了。',
    choices: [
      { id: 'to_scenery', text: '看向窗外', nextSceneId: 'act1_scenery_observe', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  // 互動節點二：觀察景物（朝雨、柳色）
  'act1_scenery_observe': {
    id: 'act1_scenery_observe',
    backgroundUrl: BG_INN_WILLOW,
    characterId: CharacterId.WangWei,
    text: '（你看向窗外）\n看，今天早上的雨把路上的灰塵都洗乾淨了（浥輕塵），客棧旁邊的柳樹經過雨水沖洗，顏色看起來特別清新（柳色新）。',
    choices: [
      { id: 'scenery_reply', text: '等待元二回應', nextSceneId: 'act1_scenery_quiz', isGrowthMindset: false }
    ]
  },

  'act1_scenery_quiz': {
    id: 'act1_scenery_quiz',
    backgroundUrl: BG_INN_WILLOW,
    characterId: CharacterId.YuanEr,
    text: '這柳樹真綠啊... 讓我想起以前我們在長安的日子。王維兄，你看這景色怎麼樣？',
    choices: [
      { 
        id: 'q2_wrong', 
        text: '下雨天到處濕答答的，踩得滿腳泥，真麻煩。', 
        nextSceneId: 'act1_scenery_wrong', 
        isGrowthMindset: false 
      },
      { 
        id: 'q2_right', 
        text: '這景色很美，但也讓我覺得更加捨不得你。柳樹青青，像是在挽留你一樣。', 
        nextSceneId: 'act1_scenery_right', 
        isGrowthMindset: false 
      }
    ]
  },

  'act1_scenery_wrong': {
    id: 'act1_scenery_wrong',
    backgroundUrl: BG_INN_WILLOW,
    characterId: CharacterId.YuanEr,
    text: '這... 我們即將分別，王維兄怎麼只在意腳下的泥土呢？',
    choices: [
      { id: 'q2_retry', text: '重新觀察並表達情感', nextSceneId: 'act1_scenery_quiz', isGrowthMindset: false }
    ]
  },

  'act1_scenery_right': {
    id: 'act1_scenery_right',
    backgroundUrl: BG_INN_WILLOW,
    characterId: CharacterId.YuanEr,
    text: '（感動地看著你）知我者，王維兄也。這風景，讓我更捨不得離開啊。唉！',
    choices: [
      { id: 'prologue_done', text: '隨從催促出發...', nextSceneId: 'prologue_end', isGrowthMindset: false }
    ]
  },

  // ==========================================
  // 序章結束點（課堂暫停）
  // ==========================================
  'prologue_end': {
    id: 'prologue_end',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.Narrator,
    text: '【🎉 序章已通關】\n你已經回顧了送別的背景與景物：\n「渭城朝雨浥輕塵，客舍青青柳色新」\n\n最後的時刻到了，王維會對元二說什麼呢？\n（請先暫停遊戲，等待老師講課）',
    choices: [
      { id: 'show_poem', text: '查看詩詞', nextSceneId: 'poem_display_final', isGrowthMindset: false }
    ],
    specialEffect: 'gold_glow'
  },

  // ==========================================
  // （已刪除王維與元二的互動結局與選擇）
  // ==========================================

  // 最終詩詞展示 (直接接在序章之後)
  'poem_display_final': {
    id: 'poem_display_final',
    backgroundUrl: BG_POEM_SCROLL,
    characterId: CharacterId.Narrator,
    text: '《送元二使安西》\n唐·王維\n\n渭城朝雨浥輕塵，\n客舍青青柳色新。\n勸君更盡一杯酒，\n西出陽關無故人。',
    choices: [
      { id: 'goto_epilogue', text: '進入現代篇：李金小學的畢業季', nextSceneId: 'epilogue_start', isGrowthMindset: false }
    ],
    specialEffect: 'gold_glow'
  },

  // ==========================================
  // 外篇：李金小學的畢業季 (遷移學習)
  // ==========================================

  'epilogue_start': {
    id: 'epilogue_start',
    backgroundUrl: BG_CLASSROOM, // 現代課室
    characterId: CharacterId.Narrator,
    text: '時光飛逝，畫面漸漸模糊...\n\n當你再次睜開眼時，你發現自己正坐在李金小學的課室裡。\n剛剛那場唐代的送別，似乎只是一場生動的課堂體驗。',
    choices: [
      { id: 'epi_look_around', text: '看向旁邊的同學', nextSceneId: 'epilogue_dialogue_1', isGrowthMindset: false }
    ]
  },

  'epilogue_dialogue_1': {
    id: 'epilogue_dialogue_1',
    backgroundUrl: BG_CLASSROOM,
    characterId: CharacterId.XiaoMing,
    text: '（小明趴在桌上，看著窗外，長長地嘆了一口氣）\n唉...',
    choices: [
      { id: 'epi_ask_why', text: '小明，你怎麼了？', nextSceneId: 'epilogue_dialogue_2', isGrowthMindset: false }
    ]
  },

  'epilogue_dialogue_2': {
    id: 'epilogue_dialogue_2',
    backgroundUrl: BG_CLASSROOM,
    characterId: CharacterId.XiaoMing,
    text: '剛才老師講了王維和元二的故事，很感人，讓我想到了我們。\n\n快畢業了，大家都分派到不同的中學。想到要和好朋友分開，去一個完全陌生的新學校，我就覺得好害怕，好捨不得。',
    choices: [
      { id: 'epi_comfort_intro', text: '（運用剛才學到的成長思維安慰他）', nextSceneId: 'epilogue_core_choice', isGrowthMindset: false }
    ]
  },

  // 外篇核心抉擇：應用遷移
  'epilogue_core_choice': {
    id: 'epilogue_core_choice',
    backgroundUrl: BG_CLASSROOM,
    characterId: CharacterId.Player, // 此時玩家身份是同學
    text: '看著焦慮的小明，你會怎麼安慰他？',
    choices: [
      { 
        id: 'epi_fixed', 
        text: '是啊，分開真的很難過。上了中學大家都會變，以後肯定會很孤單的。', 
        nextSceneId: 'epilogue_bad', 
        isGrowthMindset: false 
      },
      { 
        id: 'epi_growth', 
        text: '別怕！就像王維對元二那樣，雖然我們不在同一間學校，但友誼不會變！新學校也是像安西一樣充滿挑戰的新開始啊！', 
        nextSceneId: 'epilogue_good', 
        isGrowthMindset: true 
      }
    ]
  },

  'epilogue_bad': {
    id: 'epilogue_bad',
    backgroundUrl: BG_CLASSROOM,
    characterId: CharacterId.XiaoMing,
    text: '你說得對... 唉，我真不想畢業。\n\n（小明的心情依然很低落，畢業的氣氛變得更加沈重了。）',
    choices: [
      { id: 'epi_retry', text: '重新鼓勵他', nextSceneId: 'epilogue_core_choice', isGrowthMindset: false }
    ],
    specialEffect: 'fade_black'
  },

  'epilogue_good': {
    id: 'epilogue_good',
    backgroundUrl: BG_CLASSROOM,
    characterId: CharacterId.XiaoMing,
    text: '（小明抬起頭，眼睛亮了起來）\n你說得對！王維他們隔著沙漠都能做朋友，我們現在還有手機呢！\n\n謝謝你，我現在覺得去新中學也沒那麼可怕了，那是我建立新「功業的地方！',
    choices: [
      { id: 'the_end', text: '【全劇終】重新開始', nextSceneId: 'start', isGrowthMindset: false }
    ],
    specialEffect: 'gold_glow'
  }
};