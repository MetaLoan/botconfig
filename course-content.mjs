// Crypto Contract Trading Course Content
// 加密货币合约交易教学内容

export const courseStructure = {
  main_menu: {
    title: "📚 Crypto Contract Trading Academy",
    description: "Master the fundamentals of cryptocurrency contract trading. Learn at your own pace through our structured curriculum.",
    chapters: [
      "intro",
      "understanding_contracts",
      "leverage_margin",
      "positions",
      "risk_management",
      "technical_analysis",
      "order_types",
      "liquidation",
      "trading_psychology",
      "common_mistakes"
    ]
  }
};

export const chapters = {
  intro: {
    id: "intro",
    title: "📖 Chapter 1: Introduction to Crypto Trading",
    content: `**Welcome to Crypto Contract Trading!**

Cryptocurrency contract trading allows you to profit from price movements without owning the actual asset. Unlike spot trading where you buy and hold crypto, contract trading lets you:

• **Trade with leverage** - Control larger positions with less capital
• **Profit from falling markets** - Short sell when prices drop
• **Hedge your portfolio** - Protect your investments
• **Access 24/7 markets** - Trade anytime, anywhere

**Key Concepts:**
1. **Derivatives** - Financial contracts deriving value from underlying assets
2. **Futures Contracts** - Agreements to buy/sell at a future date
3. **Perpetual Contracts** - No expiry date, most popular in crypto

**Why Contract Trading?**
Traditional spot trading limits you to buying low and selling high. Contract trading opens up strategies for any market condition - bull, bear, or sideways.

⚠️ **Important**: With great opportunity comes great risk. Contract trading can amplify both profits AND losses. This course will teach you how to trade responsibly.`,
    next: "understanding_contracts",
    prev: null
  },

  understanding_contracts: {
    id: "understanding_contracts",
    title: "🔄 Chapter 2: Understanding Contracts",
    content: `**Spot Trading vs Contract Trading**

**Spot Trading:**
• Buy actual cryptocurrency
• You own the asset
• Can hold indefinitely
• Limited to going "long" (buy low, sell high)
• No leverage or minimal leverage
• Example: Buy 1 BTC at $40,000, sell at $50,000 = $10,000 profit

**Contract Trading (Futures/Perpetuals):**
• Trade the price movement, not the asset
• Don't own the underlying crypto
• Time-limited (futures) or perpetual
• Can go long OR short
• Use leverage (2x to 125x)
• Example: Control $40,000 worth of BTC with only $4,000 (10x leverage)

**Types of Contracts:**

1. **Perpetual Contracts** (Most Popular)
   - No expiration date
   - Funding rate mechanism keeps price aligned with spot
   - Ideal for short-term trading

2. **Quarterly/Monthly Futures**
   - Fixed expiration date
   - Price may differ from spot (basis)
   - Used by institutions for hedging

3. **Options Contracts**
   - Right (not obligation) to buy/sell
   - Advanced strategy, higher complexity
   - Limited risk for buyers

**Contract Specifications:**
• **Tick Size**: Minimum price movement ($0.01, $0.10, etc.)
• **Contract Size**: Amount per contract (0.001 BTC, 1 ETH, etc.)
• **Settlement**: USDT-margined or Coin-margined`,
    next: "leverage_margin",
    prev: "intro"
  },

  leverage_margin: {
    id: "leverage_margin",
    title: "⚡ Chapter 3: Leverage & Margin Explained",
    content: `**What is Leverage?**

Leverage allows you to control a larger position with less capital. Think of it as a financial multiplier.

**Example:**
Without leverage: $1,000 investment, BTC rises 10% = $100 profit
With 10x leverage: $1,000 controls $10,000, BTC rises 10% = $1,000 profit

**Margin Types:**

1. **Initial Margin**
   - Capital required to open a position
   - Formula: Position Size ÷ Leverage
   - Example: $10,000 position at 10x = $1,000 initial margin

2. **Maintenance Margin**
   - Minimum balance to keep position open
   - If equity falls below this, liquidation occurs
   - Typically 40-50% of initial margin

3. **Cross Margin vs Isolated Margin**
   
   **Cross Margin:**
   • All available balance backs the position
   • Lower liquidation risk
   • One bad trade can affect entire account
   
   **Isolated Margin:**
   • Only allocated margin at risk
   • Higher liquidation risk
   • Protects rest of your account
   • Recommended for beginners

**Leverage Levels:**
• **2x-5x**: Conservative, suitable for beginners
• **10x-20x**: Moderate risk, requires experience
• **50x-125x**: Extreme risk, professional only

**The Double-Edged Sword:**
✅ Leverage amplifies profits
❌ Leverage amplifies losses
⚠️ Higher leverage = faster liquidation

**Practical Tips:**
1. Start with low leverage (3x-5x)
2. Use isolated margin until experienced
3. Never use maximum leverage
4. Account for volatility in crypto markets`,
    next: "positions",
    prev: "understanding_contracts"
  },

  positions: {
    id: "positions",
    title: "📈📉 Chapter 4: Long & Short Positions",
    content: `**Going Long (Buying)**

You profit when the price goes UP.

**Example:**
• Open LONG: BTC at $40,000 with $1,000 at 10x leverage
• Position size: $10,000
• BTC rises to $44,000 (+10%)
• Profit: $1,000 (100% return on your $1,000)
• Close at $44,000, withdraw $2,000 total

**Going Short (Selling)**

You profit when the price goes DOWN.

**Example:**
• Open SHORT: ETH at $3,000 with $500 at 10x leverage
• Position size: $5,000
• ETH drops to $2,700 (-10%)
• Profit: $500 (100% return on your $500)
• Close at $2,700, withdraw $1,000 total

**Entry & Exit Points:**

**For LONG positions:**
• Entry: After confirmation of uptrend
• Stop-Loss: Below recent support
• Take-Profit: At resistance levels

**For SHORT positions:**
• Entry: After confirmation of downtrend
• Stop-Loss: Above recent resistance
• Take-Profit: At support levels

**Position Sizing:**

**The 2% Rule:**
Never risk more than 2% of your account on a single trade.

Example with $10,000 account:
• Max risk per trade: $200
• If stop-loss is 5% away: Position = $4,000
• Use 2.5x leverage on $1,600 margin

**Multiple Position Strategy:**
• Long-term position: 50% of capital, low leverage (3x-5x)
• Swing trades: 30% of capital, medium leverage (5x-10x)
• Scalp trades: 20% of capital, adjustable leverage

**Common Mistakes:**
❌ Shorting in a bull market
❌ Going long in a bear market
❌ No stop-loss orders
❌ Over-leveraging
✅ Trade with the trend
✅ Always use stop-losses
✅ Start with small positions`,
    next: "risk_management",
    prev: "leverage_margin"
  },

  risk_management: {
    id: "risk_management",
    title: "🛡️ Chapter 5: Risk Management",
    content: `**The Foundation of Successful Trading**

Risk management is MORE important than finding winning trades. One uncontrolled loss can wipe out months of profits.

**The Golden Rules:**

**1. Position Sizing (2% Rule)**
Never risk more than 2% per trade.
• $10,000 account = max $200 risk per trade
• Allows for 50 consecutive losses before bankruptcy
• Professionals often use 0.5-1% risk

**2. Stop-Loss Orders (Non-Negotiable)**
Set BEFORE entering every trade.
• Technical stop: Below support (long) / Above resistance (short)
• Percentage stop: Fixed % from entry (3-5%)
• ATR-based stop: Based on volatility
• Time stop: Exit after X hours if no movement

**3. Risk-Reward Ratio**
Minimum 1:2 ratio (risk $1 to make $2).
• Good trade: Risk $100 for $300 profit (1:3)
• Great trade: Risk $100 for $500 profit (1:5)
• Never take 1:1 or worse

**4. Diversification**
Don't put all eggs in one basket.
• Trade multiple cryptocurrencies
• Mix timeframes (scalp, swing, position)
• Different strategies (trend-following, mean-reversion)

**5. Leverage Control**
• Beginners: 2x-5x maximum
• Intermediate: 5x-10x
• Advanced: 10x-20x
• Professionals only: 20x+

**Position Management:**

**Scaling In:**
Don't enter full position at once.
• First entry: 25% at market
• Second: 25% on pullback
• Third: 50% on confirmation

**Scaling Out:**
Take profits gradually.
• First TP: 30% at 1:2 R:R
• Second TP: 40% at 1:3 R:R
• Final TP: 30% at trailing stop

**Account Management:**

**Drawdown Limits:**
• 10% daily loss: Stop trading
• 20% monthly loss: Reduce size or paper trade
• 30% total drawdown: Take a break, review strategy

**Capital Preservation:**
• Keep 20-30% in stablecoins
• Withdraw profits regularly
• Reinvest only from profits, not principal

**Psychological Stops:**
• After 3 consecutive losses: Stop for the day
• Feeling emotional: Don't trade
• Tired or stressed: Close positions

**Risk Management Checklist:**
✅ Stop-loss set before entry
✅ Position size calculated (2% rule)
✅ Risk-reward ratio minimum 1:2
✅ Account balance allows for drawdown
✅ Not over-leveraged
✅ Diversified across assets
✅ Clear exit plan`,
    next: "technical_analysis",
    prev: "positions"
  },

  technical_analysis: {
    id: "technical_analysis",
    title: "📊 Chapter 6: Technical Analysis Basics",
    content: `**Reading the Market**

Technical Analysis (TA) uses historical price data to predict future movements.

**Essential Chart Patterns:**

**1. Trend Lines**
• Uptrend: Higher highs + Higher lows
• Downtrend: Lower highs + Lower lows
• Sideways: Horizontal channel
• **Rule**: Trade WITH the trend

**2. Support & Resistance**
• Support: Price level where buying pressure > selling
• Resistance: Price level where selling pressure > buying
• **Strategy**: Buy at support, sell at resistance
• **Breakout**: Strong move through level = trend change

**3. Key Chart Patterns**

**Bullish Patterns:**
• Double Bottom (W shape)
• Inverse Head & Shoulders
• Ascending Triangle
• Bullish Flag/Pennant

**Bearish Patterns:**
• Double Top (M shape)
• Head & Shoulders
• Descending Triangle
• Bearish Flag/Pennant

**Essential Indicators:**

**1. Moving Averages (MA)**
• MA 50: Short-term trend
• MA 200: Long-term trend
• Golden Cross: MA50 crosses above MA200 (bullish)
• Death Cross: MA50 crosses below MA200 (bearish)

**2. Relative Strength Index (RSI)**
• 0-30: Oversold (potential buy)
• 70-100: Overbought (potential sell)
• 40-60: Neutral zone
• Divergence: Price vs RSI disagreement (reversal signal)

**3. MACD (Moving Average Convergence Divergence)**
• MACD line crosses Signal line = trend change
• Histogram expanding = strong momentum
• Divergence with price = reversal warning

**4. Bollinger Bands**
• Price at lower band = oversold
• Price at upper band = overbought
• Squeeze: Low volatility before big move
• Expansion: High volatility, trend in motion

**5. Volume Analysis**
• Rising price + Rising volume = strong trend
• Rising price + Falling volume = weak trend
• Breakout + High volume = valid breakout
• Breakout + Low volume = false breakout

**Timeframe Strategy:**

**Multi-Timeframe Analysis:**
• Daily chart: Overall trend
• 4-hour chart: Entry/exit zones
• 1-hour chart: Precise entry timing
• 15-min chart: Stop-loss placement

**Trading Styles by Timeframe:**
• Scalping: 1m-15m charts
• Day trading: 15m-1h charts
• Swing trading: 4h-daily charts
• Position trading: Daily-weekly charts

**Practical TA Tips:**
✅ Use multiple indicators for confirmation
✅ Wait for candle close before entering
✅ Check volume for validation
✅ Respect major support/resistance levels
❌ Don't rely on single indicator
❌ Don't trade against major trend
❌ Don't ignore fundamental news`,
    next: "order_types",
    prev: "risk_management"
  },

  order_types: {
    id: "order_types",
    title: "🎯 Chapter 7: Order Types & Execution",
    content: `**Mastering Order Execution**

Different order types serve different strategies. Using the right order can save you money and improve execution.

**Basic Order Types:**

**1. Market Order**
• Executes immediately at current price
• Guaranteed fill, price not guaranteed
• Use when: Speed > Price (breakouts, stop-outs)
• Slippage risk in volatile markets
• ✅ Fast execution
• ❌ May get worse price

**2. Limit Order**
• Executes only at specified price or better
• Guaranteed price, fill not guaranteed
• Use when: Price > Speed (ranging markets)
• May never fill if price doesn't reach
• ✅ Price control
• ❌ May miss opportunity

**3. Stop-Loss Order**
• Becomes market order when price reached
• Protects against further losses
• Use: ALWAYS, for every position
• Set below support (long) or above resistance (short)
• ✅ Automatic risk management
• ⚠️ Can be triggered by wicks

**4. Stop-Limit Order**
• Becomes limit order when stop price reached
• More control than regular stop-loss
• Risk: May not fill in fast-moving markets
• Use: When you want specific exit price
• ✅ Price + trigger control
• ❌ May not execute in gaps

**Advanced Order Types:**

**5. Take-Profit Order**
• Automatically close position at profit target
• Set at resistance (long) or support (short)
• Partial TP: Close portion at multiple levels
• ✅ Locks in profits
• ✅ Removes emotion

**6. Trailing Stop**
• Stop-loss that follows price movement
• Moves up (long) or down (short) with profit
• Locks in gains while allowing upside
• Set as % or fixed amount
• ✅ Maximizes trend profits
• ❌ Can exit too early in volatile moves

**7. OCO (One-Cancels-Other)**
• Two orders: stop-loss + take-profit
• When one executes, other cancels
• Essential for set-and-forget trading
• ✅ Fully automated exit
• ✅ Risk + reward defined

**8. Iceberg Order**
• Shows only portion of total order
• Reduces market impact on large trades
• Used by whales and institutions
• Prevents front-running

**9. Post-Only Order**
• Only adds liquidity (maker order)
• Never takes existing orders
• Pays negative fees (rebates)
• ✅ Lower fees
• ❌ No guaranteed fill

**Order Execution Strategies:**

**For Opening Positions:**

**Scalping/Day Trading:**
1. Set limit order at key level
2. If price approaching fast: Market order
3. Immediate stop-loss placement
4. Multiple take-profit levels

**Swing Trading:**
1. Limit order in demand zone
2. Wait for price to come to you
3. OCO order for exits
4. Re-enter on pullbacks

**Position Trading:**
1. Scale in with multiple limit orders
2. Dollar-cost average entry
3. Wide stop-loss (weekly/monthly support)
4. Trailing stop for exits

**Order Placement Tips:**

**Entry Orders:**
• Place limit orders just inside support/resistance
• BTC support at $40,000 → Limit buy at $40,050
• Avoids false breakouts
• Better fill probability

**Stop-Loss Placement:**
• Below/above wicks, not bodies
• Account for exchange spread
• Give room for volatility
• Typical: 3-5% for day trades, 10-15% for swings

**Take-Profit Laddering:**
Example for $10,000 LONG position:
• TP1: 30% at +5% ($300 profit)
• TP2: 40% at +10% ($400 profit)
• TP3: 30% trailing stop (maximize gains)

**Common Order Mistakes:**
❌ Using market orders in low liquidity
❌ Stop-loss too tight (gets stopped out)
❌ No stop-loss at all
❌ Limit orders too far from price
❌ Forgetting to set take-profit
✅ Use appropriate order for situation
✅ Always have stop-loss
✅ Scale out for profits
✅ Consider fees in order placement`,
    next: "liquidation",
    prev: "technical_analysis"
  },

  liquidation: {
    id: "liquidation",
    title: "⚠️ Chapter 8: Understanding Liquidation",
    content: `**What is Liquidation?**

Liquidation occurs when your margin balance falls below the maintenance margin requirement. The exchange forcibly closes your position to prevent further losses.

**How Liquidation Works:**

**Example (LONG position):**
• Account: $1,000
• Position: $10,000 BTC at 10x leverage
• Entry: $40,000
• Maintenance Margin: 0.5%
• Liquidation occurs if position loses ~$950

**Liquidation Price Calculation:**

For LONG:
Liquidation Price = Entry × (1 - 1/Leverage + Maintenance Margin)

For SHORT:
Liquidation Price = Entry × (1 + 1/Leverage - Maintenance Margin)

**Real Example:**
• LONG BTC at $40,000
• 10x leverage
• Liquidation ≈ $36,400 (-9%)
• 20x leverage
• Liquidation ≈ $38,200 (-4.5%)
• 50x leverage
• Liquidation ≈ $39,200 (-2%)

**The Liquidation Process:**

1. **Initial Warning**
   • Position hits 80% loss of margin
   • Some exchanges send notifications
   • Time to add margin or close

2. **Forced Closure**
   • Position hits liquidation price
   • Exchange closes position automatically
   • Bankruptcy price reached

3. **Liquidation Fee**
   • Exchange charges fee (0.5-1%)
   • Taken from remaining margin
   • You lose initial margin + fee

**Protecting Against Liquidation:**

**1. Use Lower Leverage**
• 5x vs 50x = 10x more room before liquidation
• Lower returns, but safer
• Can withstand market volatility

**2. Monitor Margin Ratio**
Most exchanges show:
• Green (50-100%): Safe
• Yellow (20-50%): Caution
• Red (<20%): Danger zone

**3. Add Margin (Top-Up)**
• Transfer more funds to position
• Moves liquidation price further
• Buys time for market to recover
• ⚠️ Don't throw good money after bad

**4. Set Stop-Loss BEFORE Liquidation**
• Liquidation at $36,000
• Set stop-loss at $37,000
• Saves you money and control
• You decide exit, not exchange

**5. Use Isolated Margin**
• Only allocated funds at risk
• One liquidation doesn't affect other positions
• Protects account balance
• Highly recommended for beginners

**Cascade Liquidations:**

**What happens:**
1. Large position gets liquidated
2. Forced selling pushes price down further
3. Triggers more liquidations
4. Creates price cascade
5. "Liquidation hunts" by whales

**Famous Examples:**
• March 2020: $1B+ liquidated in one day
• May 2021: $10B+ in 24 hours
• Leverage users wiped out
• Spot holders unaffected

**Avoiding Liquidation Hunts:**

• Don't use obvious stop-loss levels
• Avoid exact round numbers ($40,000, $50,000)
• Use slightly wider stops
• Trade smaller size with lower leverage
• Watch liquidation heatmaps

**Liquidation Strategies:**

**Conservative Approach:**
• Max 5x leverage
• Stop-loss at 50% of distance to liquidation
• Always have reserve margin
• Isolated margin mode

**Aggressive Approach:**
• 10-20x leverage
• Tight stop-losses
• Active monitoring required
• Only for experienced traders

**Emergency Actions:**

If approaching liquidation:
1. ✅ Close losing positions partially
2. ✅ Add margin if still confident
3. ✅ Set stop-loss before liquidation
4. ❌ Don't hope for reversal
5. ❌ Don't average down without plan
6. ❌ Don't panic sell at worst price

**Key Takeaways:**
• Liquidation means losing your entire margin
• Higher leverage = faster liquidation
• Always know your liquidation price
• Stop-loss > Liquidation
• Use isolated margin for safety
• Lower leverage allows mistakes
• Most retail traders get liquidated
• Don't be a statistic`,
    next: "trading_psychology",
    prev: "order_types"
  },

  trading_psychology: {
    id: "trading_psychology",
    title: "🧠 Chapter 9: Trading Psychology",
    content: `**The Mental Game**

95% of traders lose money not from bad strategies, but poor psychology.

**The Emotional Cycle:**
Optimism → Excitement → Euphoria (Peak) → Anxiety → Denial → Fear → Panic (Bottom) → Depression → Hope → Relief → Back to Optimism

**Break the cycle by recognizing these emotions.**

**Top 6 Psychological Traps:**

**1. FOMO** - Jump in at peak, price reverses
**Solution:** Wait for pullback, follow plan

**2. Revenge Trading** - Want losses back NOW
**Solution:** Stop after 2-3 losses

**3. Over-Confidence** - Increase risk too fast
**Solution:** Stick to position sizing rules

**4. Analysis Paralysis** - Too many indicators
**Solution:** Simplify strategy, trust plan

**5. Confirmation Bias** - Ignore warning signs
**Solution:** Devil's advocate thinking

**6. Loss Aversion** - Hold losers, cut winners early
**Solution:** Predefined risk/reward ratios

**Trader Mindset (5 Pillars):**

**1. Accept Losses** - Best traders lose 40-50% of trades
**2. Process Over Outcome** - Follow plan regardless of result
**3. Emotional Detachment** - Money is a tool, not your worth
**4. Patience** - Wait for A+ setups only
**5. Continuous Learning** - Study winners AND losers

**Trading Plan Checklist:**

**Pre-Trade:**
✅ Setup in my strategy?
✅ Entry/Stop-loss/Take-profit defined?
✅ Risk-reward min 1:2?
✅ Am I emotional?

**During Trade:**
✅ Follow stop-loss religiously
✅ Don't move stop away from price
✅ Trust your analysis
❌ Don't add to losers

**Post-Trade:**
✅ Record in journal
✅ What went right/wrong?
✅ Was it according to plan?

**Managing Stress:**

**Daily:** Exercise, meditate, set loss limit, take breaks
**Weekly:** Review trades, calculate win rate, take 1-2 days off
**Stop Trading If:** 3 losses in a row, feeling emotional, tired

**Discipline Builders:**

1. **Trading Journal** - Record every trade (entry, exit, emotion, lesson)
2. **Rules Checklist** - Check before EVERY trade, no exceptions
3. **Position Sizing** - Same calculation always
4. **Screen Limits** - Set alerts, live your life

**Pro Trader Mindset:**
• "I'm wrong until proven right"
• "Protect capital first, profits second"
• "I control risk, not outcome"
• "Every trade is independent"
• "I trade probabilities, not certainties"

**Remember:** Trading is a marathon. Survive long enough to become profitable. Most fail from emotional burnout before mastering the craft.`,
    next: "common_mistakes",
    prev: "liquidation"
  },

  common_mistakes: {
    id: "common_mistakes",
    title: "🚫 Chapter 10: Common Mistakes to Avoid",
    content: `**25 Mistakes That Cost Millions**

**Beginner Mistakes (Top 5):**

**1. Over-Leveraging** 🥈
❌ Using 50x-125x leverage
✅ Start with 3x-5x max

**2. No Stop-Loss** 🥇
❌ "I'll watch the chart"
✅ Set stop BEFORE entry

**3. No Trading Plan**
❌ Impulsive decisions
✅ Write plan, backtest first

**4. Risking Too Much**
❌ 10-20% per trade
✅ Risk max 1-2% per trade

**5. Ignoring Fees**
❌ 100 trades × 0.05% = 5% gone
✅ Fewer, quality trades

**Intermediate (5-10):**

**6. Revenge Trading** 🥉
❌ Want losses back NOW
✅ Stop after 2-3 losses

**7. Averaging Down**
❌ Double down on bad trade
✅ Cut losses quick

**8. Moving Stop-Loss**
❌ "Give it more room"
✅ Trust original analysis

**9. Taking Profits Too Early**
❌ Close at +2%, miss big move
✅ Use trailing stop

**10. Holding Losers**
❌ -50%, "I'll wait"
✅ Accept loss, move on

**Advanced (11-15):**

**11. Fighting Trend**
❌ Long in downtrend
✅ Trade with trend

**12. Over-Trading**
❌ 20+ trades/day
✅ Wait for A+ setups

**13. Copying Blindly**
❌ Follow "gurus"
✅ Do own analysis

**14. Not Adapting**
❌ One strategy for all
✅ Multiple strategies

**15. Ignoring News**
❌ "TA is everything"
✅ Check calendar

**Psychological (16-18):**

**16. Emotional Trading**
❌ Trade when angry/excited
✅ Only trade when calm

**17. No Journal**
❌ Repeat mistakes
✅ Record every trade

**18. Comparing**
❌ "They made 100%"
✅ Focus on your journey

**Account (19-21):**

**19. Withdraw in Drawdown**
❌ Take out capital
✅ Only withdraw profits

**20. Not Taking Profits**
❌ Give back all gains
✅ Withdraw 20-30% monthly

**21. No Emergency Fund**
❌ Trade rent money
✅ Only risk capital

**Technical (22-25):**

**22. Wrong Orders**
❌ Market order in thin liquidity
✅ Understand execution

**23. Wrong Timeframe**
❌ Watch 1-min charts
✅ Higher TF = less stress

**24. Ignore Spread**
❌ Already -0.1% at entry
✅ Factor spread into stops

**25. No Volume Check**
❌ Breakout on no volume
✅ Volume = conviction

**Top 5 Most Expensive:**
🥇 No stop-loss
🥈 Over-leveraging
🥉 Revenge trading
4. Poor position sizing
5. Ignoring risk management

**Path Forward:**
Mistake → Record → Create Rule → Build Habit

**Final Wisdom:**
The market rewards discipline, patience, and risk management. Not intelligence, luck, or fancy indicators.

**Your Action Plan:**
1. Highlight mistakes you've made
2. Create prevention rules
3. Check before EVERY trade

You WILL make mistakes. Goal: Don't make NEW ones. Every loss is tuition. Masters never stop learning.`,
    next: null,
    prev: "trading_psychology"
  }
};

// Helper function to get chapter by ID
export function getChapter(chapterId) {
  return chapters[chapterId] || null;
}

// Helper function to get all chapter titles for menu
export function getChapterList() {
  return courseStructure.main_menu.chapters.map(id => ({
    id,
    title: chapters[id].title
  }));
}


