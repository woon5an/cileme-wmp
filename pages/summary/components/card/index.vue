<template>
  <view class="container">
    <!-- 卡片1 -->
    <view
      class="card"
      :style="{ top: top1 + 'rpx', left: left1 + 'rpx', zIndex: isFirstCard ? 2 : 1, opacity: isFirstCard ? 1 : 0 }"
      @touchstart="viewTouchInside"
      @touchmove="viewDidMove"
      @touchend="viewTouchUpDownInside"
      :animation="animation1"
    >
	  <view class="head">
	  	2024-11-28
	  </view>
	  <view class="content">
	  	<view class="row">
			<view class="label">
				🍳BREAKFAST
			</view>
			<view class="score">
				➕10
			</view>
	  	</view>
		<view class="row">
			<view class="label">
				🍜LUNCH
			</view>
			<view class="score">
				➕10
			</view>
		</view>
		<view class="row">
			<view class="label">
				🍜LUNCH
			</view>
			<view class="score">
				➕10
			</view>
		</view>
		<view class="row">
			<view class="label">
				🍜LUNCH
			</view>
			<view class="score">
				➕10
			</view>
		</view>
		<view class="row">
			<view class="label">
				🍜LUNCH
			</view>
			<view class="score">
				➕10
			</view>
		</view>
		<view class="total">
			<view class="label">
				TOTAL:
			</view>
			<view class="score">
				60
			</view>
		</view>
	  </view>
<!--      <view class="name">{{ name1 }}</view>
      <view class="location">{{ location1 }}</view>
      <image class="like-img" :src="likeImgURL1" mode="cover" @click="likeImgDidClick"></image> -->
    </view>

    <!-- 卡片2 -->
    <view
      class="card"
      :style="{ top: top2 + 'rpx', left: left2 + 'rpx', zIndex: isFirstCard ? 1 : 2, opacity: isFirstCard ? 0 : 1 }"
      @touchstart="viewTouchInside"
      @touchmove="viewDidMove"
      @touchend="viewTouchUpDownInside"
      :animation="animation2"
    >
	  <view class="head">
		2024-11-28
	  </view>
      <view class="name">{{ name2 }}</view>
      <view class="location">{{ location2 }}</view>
      <image class="like-img" :src="likeImgURL2" mode="cover" @click="likeImgDidClick"></image>
    </view>
	
	<view class="result">
		还可以嘛！
	</view>
  </view>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const marginHori = 74
const marginVerti = 100

const top1 = ref(marginVerti)
const left1 = ref(marginHori)
const top2 = ref(marginVerti)
const left2 = ref(marginHori)

const startX = ref(0)
const startY = ref(0)

const isFirstCard = ref(true)

const animation1 = ref({})
const animation2 = ref({})

const name1 = ref('卡片1')
const name2 = ref('卡片2')
const location1 = ref('位置1')
const location2 = ref('位置2')

const likeImgURL1 = ref("../../../../static/images/icon_like.png")
const likeImgURL2 = ref("../../../../static/images/icon_like.png")

const isLike1 = ref(false)
const isLike2 = ref(false)

// 获取屏幕尺寸
const systemInfo = uni.getSystemInfoSync()
const screenWidth = systemInfo.windowWidth
const screenHeight = systemInfo.windowHeight

// 触摸开始事件
const viewTouchInside = (event) => {
  startX.value = event.touches[0].pageX
  startY.value = event.touches[0].pageY

  const animation = uni.createAnimation({
    duration: 100,
    timingFunction: 'ease-out',
  })
  animation.scale(0.9).step()

  if (isFirstCard.value) {
    animation1.value = animation.export()
  } else {
    animation2.value = animation.export()
  }
}

// 触摸移动事件
const viewDidMove = (event) => {
  const pointX = event.touches[0].pageX
  const pointY = event.touches[0].pageY

  const widthCenter = screenWidth / 2
  const heightCenter = screenHeight / 2

  const perX = (pointX - startX.value) / widthCenter
  const perY = (pointY - startY.value) / heightCenter
  const maxPer = Math.max(Math.abs(perX), Math.abs(perY))

  const animationOpacity = uni.createAnimation({
    duration: 100,
    timingFunction: 'ease-out',
  })
  animationOpacity.opacity(maxPer).step()

  const animationRotate = uni.createAnimation({
    duration: 100,
    timingFunction: 'ease-out',
  })
  animationRotate.scale(0.9).rotate(perX * 20).step()

  // 限制卡片的拖动范围，避免超出屏幕左边界
  const x = Math.min(Math.max(marginHori + pointX - startX.value, 0), screenWidth - 600)
  const y = Math.min(Math.max(marginVerti + pointY - startY.value, 0), screenHeight - 800)

  if (isFirstCard.value) {
    left1.value = x
    top1.value = y
    animation1.value = animationRotate.export()
    animation2.value = animationOpacity.export()
  } else {
    left2.value = x
    top2.value = y
    animation1.value = animationOpacity.export()
    animation2.value = animationRotate.export()
  }
}

// 触摸结束事件
const viewTouchUpDownInside = (event) => {
  const endX = event.changedTouches[0].pageX
  const endY = event.changedTouches[0].pageY

  const distanceX = endX - startX.value
  const distanceY = endY - startY.value

  // 判断是否需要移除卡片
  if (distanceX > 93.75) {
    removeCard('right')
  } else if (distanceX < -93.75) {
    removeCard('left')
  } else if (distanceY < -100) {
    removeCard('up')
  } else if (distanceY > 100) {
    removeCard('down')
  }

  // 如果卡片没有移出，恢复到初始位置
  if (distanceX < 93.75 && distanceX > -93.75 && distanceY > -150 && distanceY < 150) {
    if (isFirstCard.value) {
      top1.value = marginVerti
      left1.value = marginHori
    } else {
      top2.value = marginVerti
      left2.value = marginHori
    }
  }

  const animation = uni.createAnimation({
    duration: 100,
    timingFunction: 'ease-out',
  })
  animation.scale(1).step()

  if (isFirstCard.value) {
    animation1.value = animation.export()
  } else {
    animation2.value = animation.export()
  }
}

// 移除卡片的逻辑
const removeCard = (direction) => {
  const animation = uni.createAnimation({
    duration: 250,
    timingFunction: 'linear',
  })

  if (direction === 'right') {
    animation.translateX(400).rotate(45).opacity(0).step()
	animation.translateX(0).rotate(0).step()
  } else if (direction === 'left') {
    animation.translateX(-400).rotate(-45).opacity(0).step()
	animation.translateX(0).rotate(0).step()
  } else if (direction === 'up') {
    animation.translateY(-400).opacity(0).step()
	animation.translateY(0).step()
  } else if (direction === 'down') {
    animation.translateY(400).opacity(0).step()
	animation.translateY(0).step()
  }

  if (isFirstCard.value) {
    animation1.value = animation.export()
    isFirstCard.value = false
  } else {
    animation2.value = animation.export()
    isFirstCard.value = true
  }

  // 重置位置，确保卡片重新出现在屏幕中
  nextTick(() => {
    if (isFirstCard.value) {
      left1.value = marginHori
      top1.value = marginVerti
    } else {
      left2.value = marginHori
      top2.value = marginVerti
    }
  })
}

// 点赞点击事件
const likeImgDidClick = () => {
  requestLike()
}

// 更新图片链接
const setImgURL = () => {
  if (isFirstCard.value && isLike1.value) {
    likeImgURL1.value = "../../../../static/images/icon_like_hl.png"
  } else {
    likeImgURL1.value = "../../../../static/images/icon_like.png"
  }

  if (!isFirstCard.value && isLike2.value) {
    likeImgURL2.value = "../../../../static/images/icon_like_hl.png"
  } else {
    likeImgURL2.value = "../../../../static/images/icon_like.png"
  }
}

// 处理点赞的请求
const requestLike = () => {
  if (isFirstCard.value) {
    isLike1.value = !isLike1.value
  } else {
    isLike2.value = !isLike2.value
  }
  setImgURL()

  const noticeMsg = (isFirstCard.value ? isLike1.value : isLike2.value) ? '添加成功' : '取消成功'
  
  uni.showToast({
    title: noticeMsg,
    duration: 1000,
    icon: 'success',
  })
}
</script>

<style scoped lang="scss">
/* 整体容器 */
.container {
  position: fixed; /* 固定位置 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fff;
} 

/* 卡片样式 */
.card {
  width: 600rpx;
  height: 800rpx;
  box-sizing: border-box;
  background-color: white;
  text-align: center;
  box-shadow: 2rpx 2rpx 8rpx #aaa;
  border-radius: 20rpx;
  position: absolute;
}
.card .head {
	box-sizing: border-box;
	width: 100%;
	height: 100rpx;
	background-color: #EEA9B8;
	position: absolute;
	padding-left: 20px;
	top: 0;
	left: 0;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
	line-height: 100rpx;
	font-size: 25px;
	font-family: PingFang SC, PingFang SC-Bold;
	font-weight: 700;
	text-align: left;
	color: #ffffff;
}
.card .head::before{
	content: "";
	position: absolute;
	top: 50rpx;
	right: 20px;
	transform: translate(0, -50%);
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	background-color: #fff;
}
.card .content {
	box-sizing: border-box;
	width: 100%;
	height: calc(100% - 100rpx);
	margin-top: 100rpx;
	padding: 40rpx 40rpx 20rpx 40rpx;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 20rpx;

	.row {
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.label {
			background: #EEA9B8;
			padding: 10rpx;
			border-radius: 15rpx;
		}
		.score {
			
		}
	}
	.total {
		width: 100%;
		height: 56rpx;
		display: flex;
		align-self: flex-end;
		justify-content: flex-end;
		align-items: baseline;
		.label {
			font-size: 10px;
			font-family: PingFang SC, PingFang SC-Regular;
			font-weight: 400;
			text-align: left;
			color: #666666;
		}
		.score {
			font-size: 20px;
			font-family: Microsoft YaHei, Microsoft YaHei-Bold;
			font-weight: 700;
			text-align: left;
			color: #0ddba4;
		}
	}
}
/* 卡片内的名字 */
.card .name {
  font-size: 35rpx;
  font-weight: bolder;
  margin: 200rpx 0 40rpx;
}

/* 卡片内的地点 */
.card .location {
  font-size: 20rpx;
  margin: 50rpx 0 40rpx;
}

/* 点赞图片 */
.card .like-img {
  width: 50rpx;
  height: 45rpx;
  margin: 100rpx 0 40rpx;
}
.container .result {
	box-sizing: border-box;
	position: absolute;
	bottom: 80rpx;
	width: 100%;
	height: 400rpx;
	font-size: 50px;
	padding: 20rpx 20rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
