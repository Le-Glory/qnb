<template>
	<view>
		<view class="newsbox">
			<view class="pic">
				<image :src="news.picurl" mode="aspectFill"></image>
			</view>
			<view class="news">
				<view class="title">{{news.title}}</view>
				<view class="info">
					<text>{{news.author}}</text>
					<text>{{news.hits ? `${news.hits}浏览` : `${news.looktime}`}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"newsbox",
		props:{
			news:{ type: Object }
		},
		data() {
			return {

			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
	.newsbox{
		display: flex;
		
		.pic{
			width: 230rpx;
			height: 160rpx;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
		
		.news{
			flex: 1;
			padding-left: 30rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			
			.title{
				font-size: 36rpx;
				font-weight: 700;
				color: #333;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			
			.info{
				font-size: 26rpx;
				color: #999;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
	}
</style>`