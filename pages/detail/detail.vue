<template>
	<view class="detail">
		<view class="title">{{newsDetail.title}}</view>
		<view class="author">
			<text>编辑：{{newsDetail.author}}</text>
			<text>发布时间：{{postTime}}</text>
		</view>
		<view class="news">
			<rich-text :nodes="newsDetail.content"></rich-text>
		</view>
		<view class="statement">
			声明：本站的内容均采集与腾讯新闻，如果侵权请联系管理（513894357@qq.com）进行整改删除，本站进行了内容采集不代表本站及作者观点，
			若有侵犯请及时联系管理员，谢谢您的支持。
		</view>
	</view>
</template>

<script>
	import getDetail from '@/api/getDetail.js'
	import timeConversion from '@/uitls/timeConversion.js'
	export default {
		data() {
			return {
				option: {},
				newsDetail: {}
			}
		},
		computed: {
			postTime(){
				return timeConversion(this.newsDetail.posttime)
			}
		},
		onLoad(e) {
			this.option = e
			this.getNewsDetail()
		},
		methods: {
			getNewsDetail(){
				getDetail(this.option).then((res) => {
					//富文本解析图片时让图片完整显示
					res.data.content = res.data.content.replace(/<img/gi, '<img style="max-width:100%"')
					this.newsDetail = res.data
					this.saveHistory()
					uni.setNavigationBarTitle({
						title: this.newsDetail.title
					})
				})
			},
			saveHistory(){
				let historyArr = uni.getStorageSync("historyArr") || []
				let item = {
					id: this.newsDetail.id,
					cid: this.newsDetail.cid,
					picurl: this.newsDetail.picurl,
					title: this.newsDetail.title,
					author: this.newsDetail.author,
					looktime: timeConversion(Date.now())
				}
				let index = historyArr.findIndex(item => item.id == this.newsDetail.id)
				if(index >= 0) {historyArr.splice(index, 1)}
				historyArr.unshift(item)
				if(historyArr.length > 10) {historyArr.pop()}
				uni.setStorageSync("historyArr", historyArr)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail{
		padding: 30rpx;
		
		.title{
			font-size: 36rpx;
			color: #333;
			font-weight: 700;
		}
		
		.author{
			margin: 40rpx 0;
			padding: 20rpx 10rpx;
			background-color: #F6F6F6;
			display: flex;
			justify-content: space-between;
			color: #666;
			font-size: 25rpx;
		}
		
		.news{
			margin: 40rpx 0;
			
		}
		
		.statement{
			margin: 40rpx 0;
			background-color: #FEF0F0;
			color: #F89898;
			padding: 20rpx;
			font-size: 26rpx;
			lighting-color: 1.8em;
		}
	}
</style>
