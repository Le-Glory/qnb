<template>
	<view class="home">
		<!-- 导航栏 -->
		<scroll-view scroll-x class="navScorll">
			<view 
				class="navItem" 
				:class="index == navIndex ? 'active' : '' " 
				v-for="(item,index) in navItemArr" :key = " item.id " 
				@click="selectNav(index,item.id)" > 
				{{item.classname}}
			</view>
		</scroll-view>
		
		<!-- 根据不同的导航展示不同的数据 -->
		<view class="navContent">
			<view class="row" v-for="item in navContentArr" :key = " item.id ">
				<newsbox :news='item' @click='goDetail(item)'></newsbox>
			</view>
		</view>
		
		<!-- 当前导航没有请求数据时展示 -->
		<view  v-if="!navContentArr.length">
			<image src="../../static/images/暂无数据（无字）.png" mode="widthFix"></image>
		</view>
		
		<!-- 触底加载展示 -->
		<view class="loading" v-if="navContentArr.length">
			<view v-if="loading == 1">数据加载中......</view>
			<view v-if="loading == 2">没有更多了~~~</view>
		</view>
	</view>
</template>

<script>
	import getNav from '@/api/getNav.js'
	import getContent from '@/api/getContent.js'
	export default {
		data() {
			return {
				navIndex: 0, //当前导航的索引
				navItemArr: [], //导航栏数据
				navContentArr: [], //当前导航的展示数据
				currentPage: 1, //要请求的页数
				loading: 0, // 0：默认 1：加载中 2：没有更多
			}
		},
		onLoad() {
			this.getNavItem();
			this.getNavContent()
		},
		// 触底加载
		onReachBottom() {
			if(this.loading == 2) return;
			this.loading = 1
			this.currentPage++
			this.getNavContent(this.navItemArr[this.navIndex].id)
		},
		methods: {
			selectNav(index,id){
				this.navIndex = index
				this.currentPage = 1
				this.navContentArr = []
				this.getNavContent(id)
			},
			
			goDetail(item){
				uni.navigateTo({
					url:`/pages/detail/detail?cid=${item.classid}&id=${item.id}`
				})
			},
			
			getNavItem(){
				getNav().then(res => {
					this.navItemArr = res.data
				})
			},
			
			getNavContent(id = 50){
				getContent({
					cid: id,
					page: this.currentPage
				}).then(res => {
					if(!res.data.length) this.loading = 2
					this.navContentArr = [...this.navContentArr,...res.data]
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.navScorll{
		height: 100rpx;
		background-color: #F7F8FA;
		white-space: nowrap;
		position: fixed;
		top: var(--window-top);
		left: 0;
		z-index: 10;
		
		.navItem{
			font-size: 40rpx;
			display: inline-block;
			line-height: 100rpx;
			padding: 0 30rpx;
			color: #333;
			
			&.active{
				color: #31C27C;
			}
		}
		
	}
	
	// 取消滚动条
	scroll-view ::-webkit-scrollbar {  
	    display: none !important;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
	
	.navContent{
		padding: 20rpx;
		padding-top: 100rpx;
		.row{
			margin: 30rpx 0;
			border-bottom: 1rpx dotted #333;
		}
	}
	
	.loading{
		text-align: center;
		color: #888;
		font-size: 26rpx;
		padding: 20rpx 0;
	}
</style>
