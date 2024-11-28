<template>
	<view class="summary" @click="handleClick">
		<view class="top">
			我是顶部 可以点我一下
		</view>
<!-- 		<view class="calendarWrap">
			<view class="calendar-header">
				<view class="header">
					发车日期
				</view>
				<view class="cancel" @click="handleCancel">
					取消
				</view>
			</view>
			<view class="calendar-title">
				<span  @click="preMonth" :class="{disable: isCurrentMonth}">
					<van-icon name="arrow-left" />
				</span>
				<span style="padding: 0 67px;">{{monthTitle}}</span>
				<span  @click="nextMonth">
					<van-icon name="arrow" />
				</span>
			</view>
			<view class="calendar-content">
				<van-calendar
				  row-height="43"
				  :max-range="35"
				  type="multiple"
				  color="#0DDBA4"
				  :poppable="false"
				  :show-confirm="false"
				  :show-subtitle="false"
				  :show-title="false"
				  :min-date="minDate"
				  :max-date="maxDate"
				  :key="calendarKey"
				  :default-date="departureDate"
				  @select="selectDay"
				  @unselect="unselectDay"
				/>
			</view>
		</view> -->
	</view>
</template>

<script setup>
const handleClick = ()=> {
	uni.navigateTo({
		url: '/pages/summary/components/card/index'
	})
}
</script>

<style scoped lang="scss">
	.summary {
		width: 100%;
		height: 100vh;
		display: flex;
		.calendar-content {
			flex:1;
			// max-height: 280px;
			.van-calendar__footer {
				box-shadow: 0px -3px 12px 0px rgba(0,0,0,0.04) !important;
				padding: 0px 88px !important;
			}
		}
		.top{
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
		}
	}

</style>