<template>
	<view>
		<view class="navContent">
			<view class="row" v-for="item in historyArr">
				<newsbox :news='item' @click='goDetail(item)'></newsbox>
			</view>
		</view>
		<view v-if="!historyArr.length">
			<image src="../../static/images/暂无浏览历史（无字）.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				historyArr: []
			}
		},
		onShow() {
			this.getHistoryData()
		},
		methods: {
			goDetail(item){
				uni.navigateTo({
					url:`/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				})
			},
			getHistoryData(){
				this.historyArr = uni.getStorageSync("historyArr")
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navContent{
		padding: 20rpx;
		.row{
			margin: 30rpx 0;
			border-bottom: 1rpx dotted #333;
		}
	}
</style>
