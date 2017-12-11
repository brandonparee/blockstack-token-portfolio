import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { prettyFiat, prettyCrypto } from '../../utils'

import Fiat from '../../components/Helpers/Fiat'
import PrettyPercent from '../../components/Helpers/PrettyPercent'
import Section from '../../components/Bulma/Section'
import TransactionChart from '../../components/Charts/TransactionChart'
import TransactionTable from '../../components/Tables/TransactionTable'

const mapStateToProps = ({ portfolio, charts, marketData }, ownProps) => {
  const { abbreviation } = ownProps.match.params
  const { isFetching, transactionChartData } = charts
  return {
    abbreviation,
    portfolio,
    isFetching,
    transactionChartData,
    coinList: marketData.coinList
  }
}

class IndividualPortfolio extends Component {
  render () {
    const { portfolio, transactionChartData, isFetching, coinList } = this.props
    let { abbreviation } = this.props
    abbreviation = _.upperCase(abbreviation)
    const convertedPortfolio = portfolio.convertedPortfolio[abbreviation]
    const portfolioOverview = portfolio.portfolioOverview[abbreviation]
    const tokenInfo = coinList[abbreviation]

    return (
      <div>
        { convertedPortfolio && coinList && tokenInfo
            ? <Section title={tokenInfo.FullName}>
              <div>
                <nav className='level is-mobile'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>All Time Profit</p>
                      <p className='is-size-4'><Fiat value={convertedPortfolio.allTimeProfitUsd} /></p>
                    </div>
                  </div>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Portfolio</p>
                      <p className='is-size-4'>{`${prettyCrypto(convertedPortfolio.amount)} ${abbreviation}`}</p>
                    </div>
                  </div>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Total Value</p>
                      <p className='is-size-4'><Fiat value={convertedPortfolio.fiatValue} /></p>
                    </div>
                  </div>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Total Cost</p>
                      <p className='is-size-4'><Fiat value={portfolioOverview.totalPurchasePriceUsd} /></p>
                    </div>
                  </div>
                </nav>
                <nav className='level is-mobile'>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>Current Price</p>
                      <p className='is-size-4'><Fiat value={convertedPortfolio.fiatPrice} /></p>
                    </div>
                  </div>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>24h Change</p>
                      <p className={`is-size-4 ${Math.sign(convertedPortfolio.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'}`}><Fiat value={convertedPortfolio.dayChange} /></p>
                    </div>
                  </div>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>24h Change (BTC)</p>
                      <p className={`is-size-4 ${Math.sign(convertedPortfolio.dayChange) >= 0 ? 'has-text-success' : 'has-text-danger'}`}>{prettyCrypto(convertedPortfolio.dayChangeBtc)} BTC</p>
                    </div>
                  </div>
                  <div className='level-item has-text-centered'>
                    <div>
                      <p className='heading'>24h Change (%)</p>
                      <p className='is-size-4'><PrettyPercent value={prettyFiat(convertedPortfolio.percentChange)} /></p>
                    </div>
                  </div>
                </nav>
                <TransactionChart token={abbreviation} transactionChartData={transactionChartData[abbreviation]} isFetching={isFetching} />
                <TransactionTable abbreviation={abbreviation} />
              </div>
            </Section>
            : ''
          }
      </div>

    )
  }
}

const IndividualPortfolioContainer = connect(mapStateToProps)(IndividualPortfolio)

export default IndividualPortfolioContainer
