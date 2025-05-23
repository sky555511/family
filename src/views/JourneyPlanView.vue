<template>
  <div class="container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="🌊 烟台威海亲子游"
      fixed
      left-arrow
      @click-left="onClickLeft"
      safe-area-inset-top
      class="main-nav"
    />

    <!-- 内容区域 -->
    <div class="content">
      <!-- 行程概览 -->
      <div class="section">
        <div class="section-title">🗓️ 行程概览</div>
        <div class="overview-list">
          <div
            v-for="(item, index) in scheduleOverview"
            :key="'overview-'+index"
            class="overview-item"
          >
            <div class="day">{{ item.split('：')[0] }}</div>
            <div class="desc">{{ item.split('：')[1] }}</div>
          </div>
        </div>
      </div>

      <!-- 每日行程 -->
      <div class="section">
        <div class="section-title">🚙 每日行程</div>
        <div
          v-for="(day, index) in dailyPlans"
          :key="'day-'+index"
          class="day-card"
        >
          <div class="card-header">
            <div class="date">{{ day.date }}</div>
            <div class="subtitle">{{ day.title }}</div>
          </div>

          <!-- 交通 -->
          <div class="info-block transport">
            <div class="block-title">
              <van-icon name="car-o" class="icon" />
              <span>交通安排</span>
            </div>
            <ul>
              <li v-for="(t, tIndex) in day.transport" :key="'t-'+tIndex">
                {{ t }}
              </li>
            </ul>
          </div>

          <!-- 住宿 -->
          <div class="info-block accommodation">
            <div class="block-title">
              <van-icon name="hotel-o" class="icon" />
              <span>住宿信息</span>
            </div>
            <p>{{ day.accommodation }}</p>
          </div>

          <!-- 活动 -->
          <div class="info-block activity">
            <div class="block-title">
              <van-icon name="photo-o" class="icon" />
              <span>精彩活动</span>
            </div>
            <ul>
              <li v-for="(a, aIndex) in day.activities" :key="'a-'+aIndex">
                {{ a }}
              </li>
            </ul>
          </div>

          <!-- 餐饮 -->
          <div class="info-block dining">
            <div class="block-title">
              <van-icon name="fire-o" class="icon" />
              <span>美食安排</span>
            </div>
            <ul>
              <li v-for="(m, mIndex) in day.meals" :key="'m-'+mIndex">
                {{ m }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 费用明细 -->
      <div class="section">
        <div class="section-title">💰 费用明细</div>
        <div class="cost-grid">
          <div
            v-for="(item, index) in costDetails"
            :key="'cost-'+index"
            class="cost-item"
          >
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.amount }}</div>
          </div>
          <div class="cost-item total">
            <div class="name">总计</div>
            <div class="value">{{ totalCost }}</div>
          </div>
        </div>
      </div>

      <!-- 温馨提示 -->
      <div class="section">
        <div class="section-title">💡 温馨提示</div>
        <div class="tips-list">
          <div
            v-for="(tip, index) in travelTips"
            :key="'tip-'+index"
            class="tip-item"
          >
            <van-icon name="info" class="tip-icon" />
            <div class="tip-text">{{ tip }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 类型定义
interface DailyPlan {
  date: string
  title: string
  transport: string[]
  accommodation: string
  activities: string[]
  meals: string[]
}

interface CostDetail {
  name: string
  amount: string
}

// 响应式数据
const scheduleOverview = ref<string[]>([
  '6月2日：武汉飞烟台 → 牟平民宿入住 → 周边游玩',
  '6月3日：养马岛一日游',
  '6月4日：烟台→威海 → 自驾取车 → 环海路打卡',
  '6月5日：威海环海路深度游',
  '6月6日：西霞口动物园+那香海',
  '6月7日：退房，悦海公园→烟台金沙滩民宿',
  '6月8日：11:40飞机回武汉'
])
const dailyPlans = ref<DailyPlan[]>([
  {
    date: 'Day1（6月2日）',
    title: '烟台篇 - 抵达日',
    transport: [
      '06:30 打车前往天河机场（50元）',
      '08:45 武汉飞烟台（航班号待补充）',
      '机场打车至牟平区民宿（40分钟/80-100元）'
    ],
    accommodation: '龙湖公寓民宿（371元/2晚）',
    activities: [
      '下午：龙湖葡醍海湾沙滩+儿童乐园',
      '傍晚：北中国海公园散步观日落',
      '菜市场采购宝宝辅食材料'
    ],
    meals: [
      '午餐：蓝白快餐（牟平店）',
      '晚餐：同裕烧烤（非遗老店）'
    ]
  },
  {
    date: 'Day2（6月3日）',
    title: '养马岛环岛游',
    transport: [
      '09:00 打车前往养马岛（10分钟/15元）',
      '租电动观光车（3小时/100元）'
    ],
    accommodation: '继续入住龙湖公寓民宿',
    activities: [
      '逆时针环岛路线：海水浴场 → 獐岛木栈道 → 观海渔家乐 → 秦风崖日落观景台',
      '母婴友好停留点游玩',
      '海岛日记咖啡店打卡'
    ],
    meals: [
      '午餐：鑫岛渔家饭店（清蒸贝类拼盘）',
      '晚餐：民宿自炊'
    ]
  },
  {
    date: 'Day3（6月4日）',
    title: '转战威海',
    transport: [
      '09:00 退房打车至牟平站',
      '10:30 C6597次动车（11:04-11:21）',
      '11:30 威海站取租车（含保险673元）'
    ],
    accommodation: '海信海景壹号（1097元/3晚）',
    activities: [
      '下午：韩乐坊采购食材',
      '傍晚：国际海水浴场玩沙戏水'
    ],
    meals: [
      '午餐：台北小城（海鲜炸酱面）',
      '晚餐：民宿附近海鲜大排档'
    ]
  },
  {
    date: 'Day4（6月5日）',
    title: '环海路深度游',
    transport: [
      '自驾路线：环海路观光巴士售票处 → 猫头山2号观景台 → 半月湾沙滩 → 海源公园'
    ],
    accommodation: '继续入住海信海景壹号',
    activities: [
      '上午：环海路自驾观光',
      '下午：小石岛赶海（需查潮汐表）',
      '傍晚：国际海水浴场自由活动'
    ],
    meals: [
      '午餐：威高广场餐厅',
      '晚餐：欧乐坊夜市小吃'
    ]
  },
  {
    date: 'Day5（6月6日）',
    title: '动物园+那香海',
    transport: [
      '08:00 自驾前往西霞口（50公里/1小时）',
      '动物园内观光车（30元/人）'
    ],
    accommodation: '继续入住海信海景壹号',
    activities: [
      '西霞口神雕山动物园游览路线：',
      '猛兽区魔毯 → 猴山 → 熊猫馆 → 海洋馆 → 快艇返回',
      '下午：那香海钻石沙滩+布鲁威斯号沉船打卡'
    ],
    meals: [
      '午餐：动物园内简餐',
      '晚餐：返回威海市区用餐'
    ]
  },
  {
    date: 'Day6（6月7日）',
    title: '返程准备',
    transport: [
      '09:00 退房前往悦海公园',
      '13:30 威海站还车',
      '14:20 动车返回烟台（D6076次）',
      '15:00 打车至福山区民宿'
    ],
    accommodation: '一宿朝阳民宿（后沙广场店）370元）',
    activities: [
      '上午：悦海公园自由活动',
      '下午：转场回烟台休整'
    ],
    meals: [
      '午餐：韩乐坊餐厅',
      '晚餐：民宿周边用餐'
    ]
  },
  {
    date: 'Day7（6月8日）',
    title: '返程日',
    transport: [
      '09:20 打车前往烟台机场（70元）',
      '11:40 航班返回武汉'
    ],
    accommodation: '无',
    activities: [
      '上午：民宿早餐后整理行李',
      '机场值机托运'
    ],
    meals: [
      '早餐：民宿简餐',
      '午餐：飞机餐'
    ]
  }
])
const costDetails = ref<CostDetail[]>([
  { name: '机票（往返）', amount: '2670元' },
  { name: '住宿', amount: '371+1097+370=1838元' },
  { name: '租车费用', amount: '673+200（附加费）=873元' },
  { name: '动车票', amount: '19×3+23×3=126元' },
  { name: '打车费', amount: '430元' },
  { name: '餐饮', amount: '2500元（预估）' },
  { name: '门票', amount: '145×3+30×3=525元' },
  { name: '其他消费', amount: '200元（预估）' }
])
const travelTips = ref<string[]>([
  '👶 宝宝用品：婴儿车、防晒帽、挖沙工具、便携辅食',
  '🚗 租车检查儿童安全座椅配备情况',
  '🌞 威海停车费2元/小时，备好防晒霜',
  '🦀 小石岛赶海需穿胶鞋，工具可现场租',
  '🆔 大人带身份证，小孩带出生证明',
  '租车需要带驾照',
  '🍼 园区餐厅可免费加热辅食'
])
const totalCost = ref<string>('约9168元')

// 返回按钮处理
const onClickLeft = () => {
  history.back()
}
</script>

<style scoped>
.container {
  background: #f6faff;
  min-height: 100vh;
}

.main-nav {
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.main-nav .van-nav-bar__title {
  color: #1a73e8;
  font-weight: 600;
}

.content {
  padding: 56px 16px 20px;
}

.section-title {
  font-size: 18px;
  color: #1a73e8;
  font-weight: 600;
  padding: 12px 0;
  margin-bottom: 8px;
  border-bottom: 2px solid #1a73e8;
}

/* 行程概览 */
.overview-list {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

.overview-item {
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.overview-item:last-child {
  border-bottom: none;
}

.overview-item .day {
  color: #1a73e8;
  font-weight: 500;
  margin-bottom: 4px;
}

.overview-item .desc {
  color: #666;
  font-size: 14px;
  line-height: 1.4;
}

/* 每日行程 */
.day-card {
  background: white;
  border-radius: 8px;
  padding: 16px;
  margin: 12px 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}

.card-header {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;
}

.card-header .date {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.card-header .subtitle {
  color: #666;
  font-size: 14px;
  margin-top: 4px;
}

.info-block {
  padding: 12px;
  margin: 12px 0;
  border-radius: 6px;
}

.info-block.transport {
  background: #f8fafe;
}

.info-block.accommodation {
  background: #f5fbff;
}

.info-block.activity {
  background: #f6f8ff;
}

.info-block.dining {
  background: #fff8f5;
}

.block-title {
  display: flex;
  align-items: center;
  color: #1a73e8;
  margin-bottom: 8px;
}

.block-title .icon {
  font-size: 16px;
  margin-right: 6px;
}

.info-block ul {
  padding-left: 20px;
}

.info-block li {
  color: #444;
  line-height: 1.6;
  margin: 6px 0;
  position: relative;
}

.info-block li::before {
  content: '•';
  color: #1a73e8;
  position: absolute;
  left: -14px;
}

/* 费用明细 */
.cost-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: #eee;
}

.cost-item {
  background: white;
  padding: 12px;
}

.cost-item .name {
  color: #666;
  font-size: 14px;
}

.cost-item .value {
  color: #1a73e8;
  font-weight: 500;
  margin-top: 4px;
}

.cost-item.total {
  grid-column: 1 / -1;
  background: #f8fafe;
}

.cost-item.total .value {
  color: #07c160;
  font-size: 18px;
  font-weight: 700;
}

/* 温馨提示 */
.tips-list {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.tip-item {
  display: flex;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #eee;
}

.tip-item:last-child {
  border-bottom: none;
}

.tip-icon {
  color: #1a73e8;
  font-size: 16px;
  margin-right: 8px;
  flex-shrink: 0;
}

.tip-text {
  color: #444;
  font-size: 14px;
  line-height: 1.4;
}
</style>
