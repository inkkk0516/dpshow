/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2019, hardchain
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of hardchain nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL hardchain BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

// import utils from 'nxkit';
// import req from 'nxkit/request';
// import path from 'nxkit/path';
import {Page,React} from 'cport-h5';
import './index.css';

export default class A extends Page {
	
	state = { show: 1,
		maps: [{name: '杨**伟购买了', desc: '《霍比特2》独家限量版签名剧照'},
			{name: '张**雷购买了', desc: 'LEE PACE《霍比特2》粉丝独家见面会限量门票'},
			{name: '大**静购买了', desc: 'LEE PACE 同款乔丹鞋'},
		],
		msgs:[
			{name: '张**雷:', desc: '又官宣了一个新代言！恭喜Lee Pace越来越好!'},
			{name: '杨**伟:', desc: '啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊...'},
			{name: '人**卓:', desc: '为了中国电影为这个世界的未来充满了希望！'},
			{name: '朱**蒙:', desc: '未来可期~~'},
			{name: '卢**萍:', desc: '继续并肩前行，我们陪你实现你的梦想！'},
			{name: '大**静:', desc: '今晚太帅了！我可以呜呜呜呜！'},
			{name: '蔡**坤:', desc: '啊啊啊，哥哥冲鸭！'}
		]
	};
	onLoad() {
		this.interval = setInterval(() => {
			const { msgs, show } = this.state
			const cmsgs = [...msgs]
			const b = cmsgs.shift()
			const c = cmsgs.concat(b)

			this.setState({
				show: show+1,
				msgs: c
			})
			
			if (this.state.show >= 4) {
				this.setState({
					show: 1
				})
			}
		}, 3000);
	}
	renderLists() {
		const arr = []
		const msgs = this.state.msgs
		for(let i = 0; i < msgs.length; i++) {
			const item = (<div style={{marginTop: '.12rem'}} key={i}>
				<span style={{color: '#CFDCFF'}}>{msgs[i].name}</span>
				<span style={{color: 'rgb(49, 181, 226)', marginLeft: '.1rem'}}>{msgs[i].desc}</span></div>)
			arr.push(item)
		}
		return arr
	}
	componentWillUnmount () {
		clearInterval(this.interval)
	}
	render() {
		const {maps, show} = this.state
		const cls = `dp-mapcommon map${show}`
		const index = show > 3 ? 0 : show - 1
		return (
			<div className="dp">
				<div className="dp-header">
					<div className="dp-headerl"></div>
					<div className="dp-headerc">瑟兰迪尔の精灵王国</div>
					<div className="dp-headerr"></div>
				</div>
				{/* content */}
				<div className="dp-content">
					<div className="dpc-left">
						<div className="dpc-left_top"></div>
						<div className="dpc-left_center"></div>
						<div className="dpc-left_bottom"></div>
					</div>
					{/*  */}
					<div className="dpc-center">
						<div className="dpc-center_top">
							<div className="dpcommon"></div>
							<div className="dpcommon dpcommon2"></div>
							<div className="dpcommon dpcommon3"></div>
						</div>
						<div className="dp-map">
							<div className={cls}>
								<span style={{color: '#CFDCFF'}}>{maps[index].name}</span>{maps[index].desc}
							</div>
						</div>
						<div className="dp-location">

						</div>
					</div>
					{/*  */}
					<div className="dpc-right">
						<div className="dpcr-top"></div>
						<div className="dpcr-center"></div>
						<div className="dpcr-bottom">
							<div className="dpcr-bottombox">
								{this.renderLists()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}