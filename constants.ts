import { CharacterId, Character, StoryScene } from './types';

// 背景圖片資源 (Unsplash) - 確保古風、無現代建築、無雪山
const BG_RAINY_CITY = 'https://images.unsplash.com/photo-1518182170546-0766ce6fec56?q=80&w=1920&auto=format&fit=crop'; // 煙雨濛濛 (序章)
const BG_INN_WILLOW = 'https://images.unsplash.com/photo-1446034295857-c39f8844fad4?q=80&w=1920&auto=format&fit=crop'; // 柳樹/綠色 (客舍)
const BG_INN_INTERIOR = 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1920&auto=format&fit=crop'; // 室內/飲酒 (終章)
const BG_BAD_ENDING = 'https://images.unsplash.com/photo-1504701954957-12eb79020b84?q=80&w=1920&auto=format&fit=crop'; // 荒涼沙漠 (壞結局)
const BG_GOOD_ENDING = 'https://images.unsplash.com/photo-1533552062322-83966a496224?q=80&w=1920&auto=format&fit=crop'; // 陽光/希望/書信 (好結局)
const BG_POEM_SCROLL = 'https://images.unsplash.com/photo-1516962248584-277a32af9bf8?q=80&w=1920&auto=format&fit=crop'; // 紙張/總結

export const CHARACTERS: Record<CharacterId, Character> = {
  [CharacterId.WangWei]: {
    id: CharacterId.WangWei,
    name: '王維',
    avatarUrl: '/wangwei.png'
  },
  [CharacterId.YuanEr]: {
    id: CharacterId.YuanEr,
    name: '元二',
    avatarUrl: '/yuaner.png'
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
    text: '【序章：渭城的雨晨】\n地點：渭城客棧\n天氣：清晨小雨\n\n你扮演唐代詩人王維。今天，是你送別摯友元二的日子。',
    choices: [
      { id: 'start_act1', text: '開始故事', nextSceneId: 'intro_quiz_destination', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  // 新增：互動測驗 1 - 目的地 (Where)
  'intro_quiz_destination': {
    id: 'intro_quiz_destination',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '（我手裡拿著元二的信...）\n\n元二被皇上派去執行任務，這是一份榮耀，但也充滿挑戰。\n他要去哪裡任職呢？',
    choices: [
      { id: 'q_dest_right', text: '去西邊的「安西都護府」', nextSceneId: 'intro_dest_right', isGrowthMindset: true },
      { id: 'q_dest_wrong', text: '去南邊的「煙雨江南」', nextSceneId: 'intro_dest_wrong', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  'intro_dest_wrong': {
    id: 'intro_dest_wrong',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '不對喔。信上寫的是去西域邊疆，保護絲綢之路的安全。那裡可是沙漠遍布的地方。',
    choices: [
      { id: 'retry_dest', text: '再想一想', nextSceneId: 'intro_quiz_destination', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  'intro_dest_right': {
    id: 'intro_dest_right',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '嗯嗯，看來是在安西。哪裏離長安有幾千里遠，中間隔著大沙漠。\n這一去，不知何年何月才能再見面。',
    choices: [
      { id: 'next_quiz_loc', text: '思考送別地點...', nextSceneId: 'intro_quiz_location', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  // 新增：互動測驗 2 - 送別地點 (Location)
  'intro_quiz_location': {
    id: 'intro_quiz_location',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '既然他要往西走，我應該在哪裡為他送行，才能表達我最大的心意呢？',
    choices: [
      { id: 'q_loc_right', text: '去「渭城」（咸陽），那是西行的起點', nextSceneId: 'intro_loc_right', isGrowthMindset: true },
      { id: 'q_loc_wrong', text: '就在我家門口揮揮手就好', nextSceneId: 'intro_loc_wrong', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  'intro_loc_wrong': {
    id: 'intro_loc_wrong',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '這可是去安西啊！只在門口送別太隨便了。人們送別，通常都會送到城外很遠的地方。',
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
    backgroundUrl: BG_RAINY_CITY,
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
        text: '下雨天到處溼答答的，踩得滿腳泥，真麻煩。', 
        nextSceneId: 'act1_scenery_wrong', 
        isGrowthMindset: false 
      },
      { 
        id: 'q2_right', 
        text: '這景色很美，但也讓我覺得更加捨不得你。柳樹青青，像是在挽留你一樣。', 
        nextSceneId: 'act1_scenery_right', 
        isGrowthMindset: true 
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
      { id: 'pause_game', text: '繼續遊戲', nextSceneId: 'act2_intro', isGrowthMindset: false }
    ],
    specialEffect: 'gold_glow'
  },

  // ==========================================
  // 第二部分：終章 - 情感與抉擇
  // 教學目標：勸君更盡一杯酒 (成長思維抉擇)
  // ==========================================
  'act2_intro': {
    id: 'act2_intro',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.Narrator,
    text: '【終章：最後的抉擇】\n課堂繼續。\n元二已經站起身，馬車就在門外等候。這是最後說話的機會了。',
    choices: [
      { id: 'continue_act2', text: '回到客棧', nextSceneId: 'act2_dialogue_1', isGrowthMindset: false }
    ]
  },

  'act2_dialogue_1': {
    id: 'act2_dialogue_1',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.YuanEr,
    text: '王維兄，酒已喝乾，我該走了。這一去，不知何年何月才能再見...',
    choices: [
      { id: 'c3_pour_wine', text: '端起酒壺，倒滿最後一杯酒', nextSceneId: 'act2_core_choice', isGrowthMindset: false }
    ]
  },

  // 核心抉擇節點
  'act2_core_choice': {
    id: 'act2_core_choice',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.WangWei,
    text: '（你看著滿杯的酒，心裡五味雜陳。作為好朋友，這最後一句話該說什麼？）',
    choices: [
      { 
        id: 'choice_fixed', 
        text: '這一定是最後一杯了... 你走了，我會非常非常孤單，以後再也沒人陪我喝酒了。', 
        nextSceneId: 'bad_ending', 
        isGrowthMindset: false 
      },
      { 
        id: 'choice_growth', 
        text: '來！為了我們的友誼，再乾一杯！雖然我們會分開，但我的心陪你一起去安西。祝你建功立業！', 
        nextSceneId: 'good_ending', 
        isGrowthMindset: true 
      }
    ]
  },

  // ==========================================
  // 結局分支
  // ==========================================

  // 壞結局
  'bad_ending': {
    id: 'bad_ending',
    backgroundUrl: BG_BAD_ENDING,
    characterId: CharacterId.Narrator,
    text: '【結局：相忘於江湖】\n元二聽了你的話，帶著沉重的心情離開了。\n\n路途遙遠，因為離別時太過傷感，兩人都覺得這段友誼充滿了痛苦。漸漸地，聯繫越來越少。\n在遙遠的安西，元二常常感到孤獨；而王維也失去了一位最好的朋友。',
    choices: [
        { id: 'read_poem_bad', text: '回味這首詩', nextSceneId: 'poem_display_final', isGrowthMindset: false }
    ], 
    specialEffect: 'fade_black'
  },

  // 好結局
  'good_ending': {
    id: 'good_ending',
    backgroundUrl: BG_GOOD_ENDING,
    characterId: CharacterId.Narrator,
    text: '【結局：天涯若比鄰】\n元二聽了你的話，感動地喝下這杯酒，帶著滿滿的勇氣踏上了旅程！\n\n雖然相隔萬里，但你們經常寫信分享生活。元二在安西努力工作，他永遠記得你那句「勸君更盡一杯酒」。\n你們的友誼，因為這份祝福，變得更深厚、更牢固了。',
    choices: [
        { id: 'read_poem_good', text: '吟誦這首千古名詩', nextSceneId: 'poem_display_final', isGrowthMindset: false }
    ], 
    specialEffect: 'gold_glow'
  },

  // 最終詩詞展示
  'poem_display_final': {
    id: 'poem_display_final',
    backgroundUrl: BG_POEM_SCROLL,
    characterId: CharacterId.Narrator,
    text: '《送元二使安西》\n唐·王維\n\n渭城朝雨浥輕塵，\n客舍青青柳色新。\n勸君更盡一杯酒，\n西出陽關無故人。',
    choices: [
      { id: 'restart', text: '回到首頁', nextSceneId: 'start', isGrowthMindset: false }
    ],
    specialEffect: 'gold_glow'
  }
};