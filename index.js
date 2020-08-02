/**
 * Created with IntelliJ IDEA.
 * User: liulinhui
 * Date: 2020/8/3
 * Time: 01:15
 * Description:
 */

const Auction = require('./Auction')
const config = require('./config')
const CronJob = require('cron').CronJob;

let auction = new Auction(config)

console.log('设置定时任务 晚上九点正式开始')

new CronJob('* * 21 * * * ', function () {
    auction.getCurrentBatchId((_, batchId) => {
        auction.placeOrder(config.tokenList.tusd,
            config.tokenList.weth,
            Number(batchId) + config.auction.batchLast,
            config.auction.buyAmount,
            config.auction.buyAmount,
            (err, res) => {
                if (err) {
                    console.error('交易失败：')
                    console.error(err)
                } else {
                    console.log('交易成功：' + res)
                }
            })
    })
}, null, true, 'America/Los_Angeles');

