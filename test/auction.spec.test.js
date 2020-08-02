/**
 * Created with IntelliJ IDEA.
 * User: liulinhui
 * Date: 2020/8/3
 * Time: 01:15
 * Description:
 */

const {should, expect, assert} = require('chai');
const auction = require('../Auction')
const config = require('../config')

describe('#拍卖单元测试', () => {

    const auc = new auction(config)

    it('测试WETH是否在gnosis dex上币', (done) => {
        auc.hasToken('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', (err, res) => {
            console.log(res ? "WETH已经在gnosis dex上币" : 'WETH没在gnosis dex上币')
            expect(res).to.be.ok
            done()
        })
    });

    it('测试DIA是否在gnosis dex上币', (done) => {
        auc.hasToken('0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419', (err, res) => {
            console.log(res ? "DIA已经在gnosis dex上币" : 'DIA没在gnosis dex上币')
            expect(res).to.be.ok
            done()
        })
    });

    it('weth对应的tokenID', (done) => {
        auc.tokenAddressToIdMap('0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2', (err, res) => {
            console.log('weth对应的tokenID：' + res)
            expect(res).to.be.ok
            done()
        })
    });

    it('dia对应的tokenID', (done) => {
        auc.tokenAddressToIdMap('0x84cA8bc7997272c7CfB4D0Cd3D55cd942B3c9419', (err, res) => {
            console.log('dia对应的tokenID：' + res)
            expect(res).to.be.ok
            done()
        })
    });

    it('签名交易', function (done) {
        auc.placeOrder(config.tokenList.tusd, config.tokenList.weth, 111,
            config.auction.buyAmount,
            config.auction.buyAmount,
            (err, res) => {
                console.log(res)
                done()
            })
    });

    it('查询当前周期', (done) => {
        auc.getCurrentBatchId((err, res) => {
            console.log('当前周期：' + Number(res))
            console.log('当前周期类型：' + (typeof (Number(res))))
            expect(res).to.be.ok
            done()
        })
    });
})
