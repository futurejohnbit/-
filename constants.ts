import { CharacterId, Character, StoryScene } from './types';

// 使用固定的自然風景圖片ID，風格偏向水墨或自然景觀
const BG_RAINY_CITY = 'https://picsum.photos/id/10/1024/768'; // 森林/樹木 (柳色)
const BG_INN_INTERIOR = 'https://picsum.photos/id/29/1024/768'; // 山景 (客舍外景)
const BG_FAREWELL_ROAD = 'https://picsum.photos/id/1044/1024/768'; // 灰色調 (離別)
const BG_POEM_SCROLL = 'https://picsum.photos/id/28/1024/768'; // 森林/意境
const BG_BAD_ENDING = 'https://picsum.photos/id/97/1024/768'; // 荒涼
const BG_GOOD_ENDING = 'https://picsum.photos/id/143/1024/768'; // 陽光/開闊

export const CHARACTERS: Record<CharacterId, Character> = {
  [CharacterId.WangWei]: {
    id: CharacterId.WangWei,
    name: '王維 (你)',
    // 使用 Notionists 風格頭像，黑白線條手繪風，較符合古代文人氣質
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=WangWei&backgroundColor=transparent'
  },
  [CharacterId.YuanEr]: {
    id: CharacterId.YuanEr,
    name: '元二',
    avatarUrl: 'https://api.dicebear.com/9.x/notionists/svg?seed=YuanEr&backgroundColor=transparent&flip=true'
  },
  [CharacterId.Player]: {
    id: CharacterId.Player,
    name: '王維',
    avatarUrl: ''
  },
  [CharacterId.Narrator]: {
    id: CharacterId.Narrator,
    name: '',
    avatarUrl: ''
  }
};

export const STORY_SCRIPT: Record<string, StoryScene> = {
  // 開場
  'start': {
    id: 'start',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.Narrator,
    text: '渭城的一個早上，灰濛濛的。昨晚下了一場雨，空氣濕濕涼涼的。客舍旁邊的柳樹，被雨水洗得乾乾淨淨，看起來特別翠綠。',
    choices: [
      { id: 'c_start', text: '走進客舍，去找元二', nextSceneId: 'node1_rain_mood', isGrowthMindset: false }
    ],
    specialEffect: 'rain'
  },

  // 節點一：對環境的看法
  'node1_rain_mood': {
    id: 'node1_rain_mood',
    backgroundUrl: BG_RAINY_CITY,
    characterId: CharacterId.WangWei,
    text: '（你看著窗外的細雨，心裏想著...）',
    choices: [
      { 
        id: 'n1_fixed', 
        text: '這雨下個不停，灰濛濛的，讓人心裏真難過，好像老天爺都在哭。', 
        nextSceneId: 'node1_response_fixed', 
        isGrowthMindset: false 
      },
      { 
        id: 'n1_growth', 
        text: '這場雨下得真好，把路上的灰塵都洗乾淨了（浥輕塵），空氣這麼清新，柳樹也變漂亮了。', 
        nextSceneId: 'node1_response_growth', 
        isGrowthMindset: true 
      }
    ]
  },
  'node1_response_fixed': {
    id: 'node1_response_fixed',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.YuanEr,
    text: '王維兄，看你皺著眉頭，是因為這場雨嗎？唉，想到馬上要分開，我也覺得這雨聲特別淒涼。',
    choices: [{ id: 'c_n1_f', text: '坐下來倒酒', nextSceneId: 'node2_farewell_dialogue', isGrowthMindset: false }]
  },
  'node1_response_growth': {
    id: 'node1_response_growth',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.YuanEr,
    text: '王維兄說得對！雨後的景色確實很美。看到你這麼樂觀，我心裏的難過也少了一些。',
    specialEffect: 'gold_glow',
    choices: [{ id: 'c_n1_g', text: '坐下來倒酒', nextSceneId: 'node2_farewell_dialogue', isGrowthMindset: false }]
  },

  // 節點二：面對未來的態度
  'node2_farewell_dialogue': {
    id: 'node2_farewell_dialogue',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.YuanEr,
    text: '這杯酒喝完，我就要去安西了。那裏全是沙漠，沒有老朋友，只有我一個人... 我真怕去了那邊會很孤單，再也見不到你了。',
    choices: [
      { id: 'c_n2_next', text: '聽著朋友的擔憂...', nextSceneId: 'node2_choice', isGrowthMindset: false }
    ]
  },
  'node2_choice': {
    id: 'node2_choice',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.WangWei,
    text: '（元二很害怕未來的孤單，這時你會對他說什麼？）',
    choices: [
      { 
        id: 'n2_fixed', 
        text: '是啊，那裏太遠太苦了，沒有朋友多可憐啊。如果不去該多好... 我們真的會從此失去聯繫吧。', 
        nextSceneId: 'node2_result_fixed', 
        isGrowthMindset: false 
      },
      { 
        id: 'n2_growth', 
        text: '老朋友，別擔心！雖然我們分開了，但我們的心永遠在一起。這杯酒是為你壯行，你去那邊是為了建功立業，我會一直在這支持你！', 
        nextSceneId: 'node2_result_growth', 
        isGrowthMindset: true 
      }
    ]
  },

  // 分支結果
  'node2_result_fixed': {
    id: 'node2_result_fixed',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.YuanEr,
    text: '（元二低下頭，眼淚流了下來）你說得對... 此去安西，恐怕就是永別了。',
    choices: [{ id: 'to_bad_end', text: '沈默地喝下最後一杯酒', nextSceneId: 'bad_ending', isGrowthMindset: false }]
  },

  'node2_result_growth': {
    id: 'node2_result_growth',
    backgroundUrl: BG_INN_INTERIOR,
    characterId: CharacterId.YuanEr,
    text: '（元二擦乾眼淚，眼神亮了起來）謝謝你，王維兄！有你這句話，我就不怕了！',
    specialEffect: 'gold_glow',
    choices: [{ id: 'to_good_end', text: '豪爽地乾了這杯酒', nextSceneId: 'node3_poem_growth', isGrowthMindset: false }]
  },

  // 好結局路線：吟詩
  'node3_poem_growth': {
    id: 'node3_poem_growth',
    backgroundUrl: BG_POEM_SCROLL,
    characterId: CharacterId.WangWei,
    text: '（你靈感湧現，大聲吟誦）\n渭城朝雨浥輕塵，客舍青青柳色新。\n勸君更盡一杯酒，西出陽關無故人！',
    specialEffect: 'gold_glow',
    choices: [{ id: 'end_g', text: '目送元二自信地出發', nextSceneId: 'good_ending', isGrowthMindset: false }]
  },

  // 壞結局
  'bad_ending': {
    id: 'bad_ending',
    backgroundUrl: BG_BAD_ENDING,
    characterId: CharacterId.Narrator,
    text: '【結局：相忘於江湖】\n那天之後，元二帶著沈重的心情離開了。因為太過悲觀，他在安西總是鬱鬱寡歡，覺得孤單寂寞。久而久之，你們的書信斷了，這份友誼也慢慢消失在風沙中...',
    choices: [
        { id: 'restart_bad', text: '重新開始，試著改變心態', nextSceneId: 'start', isGrowthMindset: false }
    ], 
    specialEffect: 'fade_black'
  },

  // 好結局
  'good_ending': {
    id: 'good_ending',
    backgroundUrl: BG_GOOD_ENDING,
    characterId: CharacterId.Narrator,
    text: '【結局：天涯若比鄰】\n元二帶著你的祝福和鼓勵，在安西勇敢地闖蕩，建立了一番功業。雖然相隔千里，但你們經常寫信。那杯送別酒，讓你們的友誼比以前更深厚，成為了一段千古佳話！',
    choices: [
        { id: 'restart_good', text: '再玩一次', nextSceneId: 'start', isGrowthMindset: false }
    ], 
    specialEffect: 'gold_glow'
  }
};