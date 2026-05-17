document.addEventListener('DOMContentLoaded', () => {
    // ── HARDCODED DATA FROM DOCUMENTS ─────────────────────────────────────────
    const HOLDINGS_RAW = [
        { name: "State Bank of India", ticker: "SBIN", qty: 16, buyPrice: 910.43, sector: "Banking", type: "Equity" },
        { name: "Adani Power Ltd", ticker: "ADANIPOWER", qty: 20, buyPrice: 144.82, sector: "Energy", type: "Equity" },
        { name: "Eicher Motors Ltd", ticker: "EICHERMOT", qty: 2, buyPrice: 6598, sector: "Auto", type: "Equity" },
        { name: "HDFC Bank Ltd", ticker: "HDFCBANK", qty: 12, buyPrice: 959.57, sector: "Banking", type: "Equity" },
        { name: "ICICI Pru Nifty ETF", ticker: "ICICIB22", qty: 25, buyPrice: 280.77, sector: "Index ETF", type: "ETF" },
        { name: "MO Midcap 100 ETF", ticker: "MOM100", qty: 190, buyPrice: 62.5, sector: "Index ETF", type: "ETF" },
        { name: "TVS Motor Company", ticker: "TVSMOTOR", qty: 2, buyPrice: 3513.3, sector: "Auto", type: "Equity" },
        { name: "Kotak PSU Bank ETF", ticker: "KOTAKPSUBK", qty: 5, buyPrice: 767.54, sector: "Index ETF", type: "ETF" },
        { name: "Tata Steel Ltd", ticker: "TATASTEEL", qty: 5, buyPrice: 175.03, sector: "Metals", type: "Equity" },
        { name: "Bank of India", ticker: "BANKINDIA", qty: 10, buyPrice: 127.07, sector: "Banking", type: "Equity" },
        { name: "Bank of Baroda", ticker: "BANKBARODA", qty: 20, buyPrice: 267.45, sector: "Banking", type: "Equity" },
        { name: "Eternal Ltd", ticker: "ETERNAL", qty: 20, buyPrice: 334.91, sector: "Consumer", type: "Equity" },
        { name: "Shriram Finance", ticker: "SHRIRAMFIN", qty: 2, buyPrice: 819.3, sector: "Finance", type: "Equity" },
        { name: "Ashok Leyland", ticker: "ASHOKLEY", qty: 15, buyPrice: 135.65, sector: "Auto", type: "Equity" },
        { name: "Bajaj Finance", ticker: "BAJFINANCE", qty: 11, buyPrice: 999.33, sector: "Finance", type: "Equity" },
        { name: "L&T Finance", ticker: "LTF", qty: 5, buyPrice: 295.75, sector: "Finance", type: "Equity" },
        { name: "Cummins India", ticker: "CUMMINSIND", qty: 1, buyPrice: 4020.4, sector: "Industrial", type: "Equity" },
        { name: "Muthoot Finance", ticker: "MUTHOOTFIN", qty: 1, buyPrice: 3722, sector: "Finance", type: "Equity" },
        { name: "SBI Life Insurance", ticker: "SBILIFE", qty: 2, buyPrice: 2004.6, sector: "Insurance", type: "Equity" },
        { name: "Bharat Electronics", ticker: "BEL", qty: 3, buyPrice: 400.7, sector: "Defence", type: "Equity" },
        { name: "Indian Oil Corp", ticker: "IOC", qty: 10, buyPrice: 162.95, sector: "Energy", type: "Equity" },
        { name: "Aditya Birla Capital", ticker: "ABCAPITAL", qty: 5, buyPrice: 289.65, sector: "Finance", type: "Equity" },
        { name: "Bajaj Auto", ticker: "BAJAJ-AUTO", qty: 1, buyPrice: 9244, sector: "Auto", type: "Equity" },
        { name: "RBL Bank", ticker: "RBLBANK", qty: 10, buyPrice: 319.5, sector: "Banking", type: "Equity" },
        { name: "Vodafone Idea", ticker: "IDEA", qty: 75, buyPrice: 9.78, sector: "Telecom", type: "Equity" },
        { name: "HDFC Gold ETF", ticker: "HDFCGOLDETF", qty: 64, buyPrice: 100.38, sector: "Gold", type: "Gold ETF" },
        { name: "SBI Gold ETF", ticker: "SBIGETS", qty: 35, buyPrice: 99.38, sector: "Gold", type: "Gold ETF" },
        { name: "Nippon Gold Bees", ticker: "GOLDBEES", qty: 94, buyPrice: 99.35, sector: "Gold", type: "Gold ETF" },
        { name: "Nippon Silver ETF", ticker: "SILVERBEES", qty: 59, buyPrice: 135.62, sector: "Silver", type: "Silver ETF" },
        { name: "TBO Tek", ticker: "TBOTEK", qty: 5, buyPrice: 1682, sector: "Technology", type: "Equity" },
        { name: "Tata Capital", ticker: "TATACAPITAL", qty: 46, buyPrice: 326, sector: "Debt", type: "Debt" },
        { name: "Indian Bank", ticker: "INDIANB", qty: 15, buyPrice: 814.8, sector: "Banking", type: "Equity" },
        { name: "Kotak Mahindra Bank", ticker: "KOTAKBANK", qty: 10, buyPrice: 423.56, sector: "Banking", type: "Equity" }
    ];

    const LOAN = {
        outstanding_aug26: 2538536,
        outstanding_mar25: 2795173,
        emi: 32829,
        fy25_interest: 269273,
        fy25_principal: 422610,
        fy26_interest_prov: 233405,
        fy26_principal_prov: 357887,
        rate: 9.5,
        account: "0212675100001571",
        bank: "IDBI Bank",
        borrower: "Ankhi Sarker",
        total_prepaid: 500000
    };

    const TAX = {
        fy25: { sec24b: 269273, sec80c_loan: 422610, sec80d: 9414, label: "FY 2024–25 (Actual)" },
        fy26: { sec24b: 233405, sec80c_loan: 357887, sec80d: 9414, label: "FY 2025–26 (Provisional)" }
    };

    // Color Theme Mapping matching style.css variables
    const COLORS = {
        gold: "#f0a500",
        teal: "#00d4aa",
        coral: "#ff6b6b",
        blue: "#4a9eff",
        purple: "#9b59b6",
        textMuted: "#6b7a99",
        cardBg: "#0d1329",
        border: "#1a2340",
        chartPalette: ["#f0a500", "#00d4aa", "#4a9eff", "#ff6b6b", "#9b59b6", "#2ecc71", "#e67e22", "#1abc9c", "#e74c3c", "#3498db", "#f39c12"]
    };

    // State Management
    const state = {
        activeTab: "networth",
        holdings: HOLDINGS_RAW.map(h => ({ ...h, currentPrice: h.buyPrice, live: false })),
        taxYear: "fy26",
        loanSimulator: {
            prepayment: 0,
            rate: LOAN.rate
        },
        searchQuery: "",
        sectorFilter: "all",
        fetching: false,
        lastUpdated: null,
        corsOfflineNotice: false,
        charts: {
            assetClass: null,
            sector: null,
            emiBreakdown: null,
            loanBalance: null,
            growth: null
        }
    };

    // DOM Elements Cache
    const elements = {
        navs: document.querySelectorAll('.nav-links a'),
        tabs: document.querySelectorAll('.tab-content'),
        btnRefresh: document.getElementById('btn-refresh'),
        lastUpdatedTime: document.getElementById('last-updated-time'),
        corsNotice: document.getElementById('cors-notice'),
        
        // Net Worth Elements
        networthVal: document.getElementById('networth-val'),
        portfolioVal: document.getElementById('portfolio-val'),
        portfolioPnl: document.getElementById('portfolio-pnl'),
        loanOutstandingVal: document.getElementById('loan-outstanding-val'),
        loanEmiVal: document.getElementById('loan-emi-val'),
        emiPortfolioRatio: document.getElementById('emi-portfolio-ratio'),
        assetLegend: document.getElementById('asset-legend-container'),
        balanceSheet: document.getElementById('balance-sheet-container'),
        
        // Portfolio Elements
        portInvestedVal: document.getElementById('port-invested-val'),
        portCurrentVal: document.getElementById('port-current-val'),
        portStatusLabel: document.getElementById('port-status-label'),
        portPnlCard: document.getElementById('port-pnl-card'),
        portPnlVal: document.getElementById('port-pnl-val'),
        portPnlPct: document.getElementById('port-pnl-pct'),
        portHoldingsCount: document.getElementById('port-holdings-count'),
        sectorLegend: document.getElementById('sector-legend-container'),
        topHoldings: document.getElementById('top-holdings-container'),
        searchHoldings: document.getElementById('search-holdings'),
        filterSector: document.getElementById('filter-sector'),
        holdingsTbody: document.getElementById('holdings-tbody'),
        
        // Loan Elements
        loanOutstandingVal2: document.getElementById('loan-outstanding-val2'),
        loanPayoffDate: document.getElementById('loan-payoff-date'),
        loanPayoffMonths: document.getElementById('loan-payoff-months'),
        prepaySliderVal: document.getElementById('prepay-slider-val'),
        rateSliderVal: document.getElementById('rate-slider-val'),
        inputPrepayment: document.getElementById('input-prepayment'),
        inputLoanRate: document.getElementById('input-loan-rate'),
        simPayoffDate: document.getElementById('sim-payoff-date'),
        simInterestSaved: document.getElementById('sim-interest-saved'),
        
        // Tax Elements
        taxSec24b: document.getElementById('tax-sec24b'),
        taxSec24bSub: document.getElementById('tax-sec24b-sub'),
        taxSec24bSave: document.getElementById('tax-sec24b-save'),
        taxSec80c: document.getElementById('tax-sec80c'),
        taxSec80cSub: document.getElementById('tax-sec80c-sub'),
        taxSec80cEligible: document.getElementById('tax-sec80c-eligible'),
        taxSec80d: document.getElementById('tax-sec80d'),
        taxSec80dSave: document.getElementById('tax-sec80d-save'),
        taxSummaryTitle: document.getElementById('tax-summary-title'),
        taxDeductionsContainer: document.getElementById('tax-deductions-container'),
        taxTotalDeductions: document.getElementById('tax-total-deductions'),
        taxTotalSavings: document.getElementById('tax-total-savings'),
        fySwitchers: document.querySelectorAll('.tax-year-switcher button'),
        
        // Goals Elements
        goalsProjectionSubtext: document.getElementById('goals-projection-subtext'),
        milestonesContainer: document.getElementById('milestones-container')
    };

    // ── CORE UTILS ────────────────────────────────────────────────────────────
    const fmtC = (n) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(n);
    };

    const fmtP = (n) => {
        return (n >= 0 ? "+" : "") + n.toFixed(2) + "%";
    };

    // Smooth counter animation
    const animateValue = (element, endValue, duration = 600, isCurrency = true) => {
        if (!element) return;
        const start = 0;
        const end = parseFloat(endValue) || 0;
        if (start === end) {
            element.textContent = isCurrency ? fmtC(end) : end;
            return;
        }
        let startTime = null;
        
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const current = progress * (end - start) + start;
            element.textContent = isCurrency ? fmtC(Math.round(current)) : Math.round(current);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = isCurrency ? fmtC(end) : end;
            }
        };
        window.requestAnimationFrame(step);
    };

    // ── TAB SWAP SYSTEM ────────────────────────────────────────────────────────
    const initTabs = () => {
        elements.navs.forEach(nav => {
            nav.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedTab = nav.getAttribute('data-tab');
                if (state.activeTab === selectedTab) return;
                
                // Toggle active nav class
                elements.navs.forEach(n => n.classList.remove('active'));
                nav.classList.add('active');
                
                // Toggle active section
                elements.tabs.forEach(tab => {
                    tab.classList.remove('active');
                    if (tab.id === `${selectedTab}-tab`) {
                        tab.classList.add('active');
                    }
                });
                
                state.activeTab = selectedTab;
                
                // Redraw charts if needed for the current active tab
                renderChartsForTab(selectedTab);
            });
        });
    };

    const renderChartsForTab = (tab) => {
        // Delay slightly for display: block layout calculations
        setTimeout(() => {
            if (tab === "networth") {
                renderNetWorthTab();
            } else if (tab === "portfolio") {
                renderPortfolioTab();
            } else if (tab === "loan") {
                renderLoanTab();
            } else if (tab === "tax") {
                renderTaxTab();
            } else if (tab === "goals") {
                renderGoalsTab();
            }
        }, 50);
    };

    // ── YAHOO FINANCE LIVE PRICE FETCH ─────────────────────────────────────────
    const fetchPrice = async (ticker) => {
        try {
            // Yahoo Finance Endpoint via CORS-friendly query API
            const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}.NS?interval=1d&range=1d`;
            const res = await fetch(url);
            if (!res.ok) throw new Error("Fetch failed");
            const data = await res.json();
            const price = data?.chart?.result?.[0]?.meta?.regularMarketPrice;
            return price || null;
        } catch (e) {
            console.warn(`Could not fetch live price for ${ticker}:`, e.message);
            return null;
        }
    };

    const refreshPrices = async () => {
        if (state.fetching) return;
        state.fetching = true;
        elements.btnRefresh.disabled = true;
        elements.btnRefresh.innerHTML = `<i data-lucide="refresh-cw" class="icon-pulse"></i> Fetching...`;
        lucide.createIcons();
        
        let successCount = 0;
        
        // Fetch prices sequentially to avoid rate-limits and handle failures gracefully
        for (let i = 0; i < state.holdings.length; i++) {
            const h = state.holdings[i];
            const livePrice = await fetchPrice(h.ticker);
            if (livePrice) {
                state.holdings[i].currentPrice = livePrice;
                state.holdings[i].live = true;
                successCount++;
            } else {
                state.holdings[i].live = false;
            }
        }

        state.fetching = false;
        elements.btnRefresh.disabled = false;
        elements.btnRefresh.innerHTML = `<i data-lucide="refresh-cw"></i> Refresh Prices`;
        
        state.lastUpdated = new Date();
        
        if (successCount === 0) {
            // Probably CORS blocked from local file:// context
            state.corsOfflineNotice = true;
            elements.corsNotice.style.display = 'inline-block';
            elements.lastUpdatedTime.textContent = "CORS Offline (Buy prices)";
        } else {
            state.corsOfflineNotice = false;
            elements.corsNotice.style.display = 'none';
            elements.lastUpdatedTime.textContent = `Updated: ${state.lastUpdated.toLocaleTimeString("en-IN")}`;
            elements.portStatusLabel.textContent = "Live prices loaded";
        }
        
        lucide.createIcons();
        
        // Re-draw active tab
        renderChartsForTab(state.activeTab);
    };

    elements.btnRefresh.addEventListener('click', refreshPrices);

    // ── CALCULATION UTILS ──────────────────────────────────────────────────────
    const getNetWorthStats = () => {
        const totalInvested = state.holdings.reduce((sum, h) => sum + h.buyPrice * h.qty, 0);
        const totalCurrent = state.holdings.reduce((sum, h) => sum + h.currentPrice * h.qty, 0);
        const totalPnL = totalCurrent - totalInvested;
        const totalPnLPct = (totalPnL / totalInvested) * 100;
        const netWorth = totalCurrent - LOAN.outstanding_aug26;
        
        return {
            totalInvested,
            totalCurrent,
            totalPnL,
            totalPnLPct,
            netWorth
        };
    };

    // Amortization builder
    const buildAmortization = (outstanding, rate, emi, months = 72) => {
        let bal = outstanding;
        const rows = [];
        const monthlyRate = rate / 100 / 12;
        for (let i = 1; i <= months && bal > 0; i++) {
            const interest = Math.round(bal * monthlyRate);
            const principal = Math.min(Math.round(emi - interest), bal);
            bal = Math.max(0, bal - principal);
            rows.push({ month: i, interest, principal, balance: bal });
        }
        return rows;
    };

    // ── TAB RENDERING ──────────────────────────────────────────────────────────

    // ── 1. NET WORTH TAB ──
    const renderNetWorthTab = () => {
        const stats = getNetWorthStats();
        
        // Animate stats cards
        animateValue(elements.networthVal, stats.netWorth);
        animateValue(elements.portfolioVal, stats.totalCurrent);
        animateValue(elements.loanOutstandingVal, LOAN.outstanding_aug26);
        animateValue(elements.loanEmiVal, LOAN.emi);
        
        // P&L display
        const pnlWrapper = elements.portfolioPnl;
        pnlWrapper.textContent = `${fmtC(Math.abs(stats.totalPnL))} (${fmtP(stats.totalPnLPct)}) P&L`;
        pnlWrapper.className = stats.totalPnL >= 0 ? 'kpi-footer positive' : 'kpi-footer negative';
        
        // EMI Portfolio Ratio
        const ratio = (LOAN.emi / stats.totalCurrent) * 100 * 12;
        elements.emiPortfolioRatio.textContent = `≈${ratio.toFixed(1)}% of portfolio/yr`;

        // Asset Mapping
        const assetMap = {};
        state.holdings.forEach(h => {
            const val = h.currentPrice * h.qty;
            assetMap[h.type] = (assetMap[h.type] || 0) + val;
        });

        const assetData = Object.entries(assetMap).map(([name, value]) => ({
            name,
            value: Math.round(value)
        }));

        // Asset Class Chart
        if (state.charts.assetClass) state.charts.assetClass.destroy();
        const ctx = document.getElementById('assetClassChart').getContext('2d');
        state.charts.assetClass = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: assetData.map(d => d.name),
                datasets: [{
                    data: assetData.map(d => d.value),
                    backgroundColor: COLORS.chartPalette,
                    borderWidth: 0,
                    hoverOffset: 6
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                cutout: '70%',
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Asset Legend
        elements.assetLegend.innerHTML = assetData.map((d, i) => `
            <div class="legend-item">
                <div class="legend-color" style="background-color: ${COLORS.chartPalette[i % COLORS.chartPalette.length]}"></div>
                <span class="legend-name">${d.name}</span>
                <span class="legend-value">${fmtC(d.value)}</span>
            </div>
        `).join('');

        // Balance Sheet bars
        const totalAssets = stats.totalCurrent;
        const barData = [
            { label: "Equity & ETFs", val: state.holdings.filter(h => h.type === "Equity" || h.type === "ETF").reduce((s, h) => s + h.currentPrice * h.qty, 0), color: COLORS.teal },
            { label: "Gold ETFs", val: state.holdings.filter(h => h.type === "Gold ETF").reduce((s, h) => s + h.currentPrice * h.qty, 0), color: COLORS.gold },
            { label: "Silver ETF", val: state.holdings.filter(h => h.type === "Silver ETF").reduce((s, h) => s + h.currentPrice * h.qty, 0), color: "#aaa" },
            { label: "Debt (Tata Capital)", val: state.holdings.filter(h => h.type === "Debt").reduce((s, h) => s + h.currentPrice * h.qty, 0), color: COLORS.blue }
        ];

        let balanceSheetHTML = barData.map(item => {
            const pct = totalAssets > 0 ? (item.val / totalAssets * 100).toFixed(1) : 0;
            return `
                <div class="bs-row">
                    <div class="bs-label-wrapper">
                        <span class="bs-label">${item.label}</span>
                        <span class="bs-value" style="color: ${item.color}">${fmtC(item.val)} (${pct}%)</span>
                    </div>
                    <div class="bs-bar">
                        <div class="bs-progress" style="width: ${pct}%; background-color: ${item.color};"></div>
                    </div>
                </div>
            `;
        }).join('');

        // Add Home Loan Liability row & Net Worth row
        const loanPct = totalAssets > 0 ? (LOAN.outstanding_aug26 / totalAssets * 100).toFixed(1) : 0;
        balanceSheetHTML += `
            <div class="bs-total-row">
                <div class="bs-row">
                    <div class="bs-label-wrapper">
                        <span class="bs-label" style="color: var(--accent-coral);">Home Loan Liability</span>
                        <span class="bs-value" style="color: var(--accent-coral); font-weight: bold;">−${fmtC(LOAN.outstanding_aug26)}</span>
                    </div>
                </div>
                <div class="bs-row" style="margin-top: 10px; border-top: 1px dashed var(--glass-border); padding-top: 10px;">
                    <div class="bs-label-wrapper">
                        <span class="bs-label" style="font-weight: 700;">NET WORTH</span>
                        <span class="bs-value bs-grand-total">${fmtC(stats.netWorth)}</span>
                    </div>
                </div>
            </div>
        `;
        elements.balanceSheet.innerHTML = balanceSheetHTML;
    };

    // ── 2. PORTFOLIO TAB ──
    const renderPortfolioTab = () => {
        const stats = getNetWorthStats();
        
        animateValue(elements.portInvestedVal, stats.totalInvested);
        animateValue(elements.portCurrentVal, stats.totalCurrent);
        animateValue(elements.portPnlVal, Math.abs(stats.totalPnL));
        elements.portPnlPct.textContent = fmtP(stats.totalPnLPct);
        elements.portHoldingsCount.textContent = state.holdings.length;
        
        const pnlCard = elements.portPnlCard;
        pnlCard.className = stats.totalPnL >= 0 ? 'kpi-card glass accent-teal' : 'kpi-card glass accent-coral';

        // Sector breakdown
        const sectorMap = {};
        state.holdings.forEach(h => {
            const val = h.currentPrice * h.qty;
            sectorMap[h.sector] = (sectorMap[h.sector] || 0) + val;
        });

        const sectorData = Object.entries(sectorMap)
            .sort((a, b) => b[1] - a[1])
            .map(([name, value]) => ({ name, value: Math.round(value) }));

        // Sector Doughnut chart
        if (state.charts.sector) state.charts.sector.destroy();
        const ctx = document.getElementById('sectorChart').getContext('2d');
        state.charts.sector = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: sectorData.map(d => d.name),
                datasets: [{
                    data: sectorData.map(d => d.value),
                    backgroundColor: COLORS.chartPalette,
                    borderWidth: 0,
                    hoverOffset: 6
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                cutout: '60%',
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Sector Legend (Top 6)
        elements.sectorLegend.innerHTML = sectorData.slice(0, 6).map((d, i) => {
            const pct = stats.totalCurrent > 0 ? (d.value / stats.totalCurrent * 100).toFixed(0) : 0;
            return `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${COLORS.chartPalette[i % COLORS.chartPalette.length]}"></div>
                    <span class="legend-name">${d.name}</span>
                    <span class="legend-value">${pct}%</span>
                </div>
            `;
        }).join('');

        // Top 10 Holdings
        const sortedHoldings = [...state.holdings].map(h => ({
            ...h,
            buyValue: h.qty * h.buyPrice,
            currentValue: h.qty * h.currentPrice,
            pnl: (h.currentPrice - h.buyPrice) * h.qty,
            pnlPct: ((h.currentPrice - h.buyPrice) / h.buyPrice) * 100
        })).sort((a, b) => b.currentValue - a.currentValue);

        elements.topHoldings.innerHTML = sortedHoldings.slice(0, 10).map((h, i) => `
            <div class="top-holding-item">
                <div class="top-holding-info">
                    <span class="top-holding-name">${h.name}</span>
                    <span class="top-holding-sub">${h.qty} × ${fmtC(h.currentPrice)}</span>
                </div>
                <div class="top-holding-nums">
                    <span class="top-holding-val">${fmtC(h.currentValue)}</span>
                    <span class="top-holding-pnl ${h.pnl >= 0 ? 'positive' : 'negative'}">${fmtP(h.pnlPct)}</span>
                </div>
            </div>
        `).join('');

        // Build sectors filter options dynamically once
        if (elements.filterSector.options.length <= 1) {
            const sectors = [...new Set(state.holdings.map(h => h.sector))].sort();
            sectors.forEach(sec => {
                const opt = document.createElement('option');
                opt.value = sec;
                opt.textContent = sec;
                elements.filterSector.appendChild(opt);
            });
        }

        renderHoldingsTable(sortedHoldings);
    };

    const renderHoldingsTable = (holdingsList) => {
        let filtered = holdingsList;
        
        if (state.searchQuery) {
            const q = state.searchQuery.toLowerCase();
            filtered = filtered.filter(h => h.name.toLowerCase().includes(q) || h.ticker.toLowerCase().includes(q));
        }

        if (state.sectorFilter !== "all") {
            filtered = filtered.filter(h => h.sector === state.sectorFilter);
        }

        elements.holdingsTbody.innerHTML = filtered.map(h => {
            const priceColor = h.live ? 'text-teal' : 'text-muted';
            return `
                <tr>
                    <td>
                        <div class="stock-name-cell">${h.name}</div>
                        <div class="stock-type-sub">${h.ticker} · ${h.type}</div>
                    </td>
                    <td><span class="badge-pill">${h.sector}</span></td>
                    <td class="text-right">${h.qty}</td>
                    <td class="text-right">${fmtC(h.buyPrice)}</td>
                    <td class="text-right"><span class="${priceColor}">${fmtC(h.currentPrice)}</span></td>
                    <td class="text-right">${fmtC(h.buyValue)}</td>
                    <td class="text-right">${fmtC(h.currentValue)}</td>
                    <td class="text-right ${h.pnl >= 0 ? 'positive' : 'negative'}">${fmtC(h.pnl)}</td>
                    <td class="text-right ${h.pnl >= 0 ? 'positive' : 'negative'}" style="font-weight: 700;">${fmtP(h.pnlPct)}</td>
                </tr>
            `;
        }).join('');
    };

    // Filter event listeners
    elements.searchHoldings.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        const sorted = [...state.holdings].map(h => ({
            ...h,
            buyValue: h.qty * h.buyPrice,
            currentValue: h.qty * h.currentPrice,
            pnl: (h.currentPrice - h.buyPrice) * h.qty,
            pnlPct: ((h.currentPrice - h.buyPrice) / h.buyPrice) * 100
        })).sort((a, b) => b.currentValue - a.currentValue);
        renderHoldingsTable(sorted);
    });

    elements.filterSector.addEventListener('change', (e) => {
        state.sectorFilter = e.target.value;
        const sorted = [...state.holdings].map(h => ({
            ...h,
            buyValue: h.qty * h.buyPrice,
            currentValue: h.qty * h.currentPrice,
            pnl: (h.currentPrice - h.buyPrice) * h.qty,
            pnlPct: ((h.currentPrice - h.buyPrice) / h.buyPrice) * 100
        })).sort((a, b) => b.currentValue - a.currentValue);
        renderHoldingsTable(sorted);
    });

    // ── 3. HOME LOAN TAB ──
    const renderLoanTab = () => {
        // Amortization formulas
        const outstanding = LOAN.outstanding_aug26;
        const rate = state.loanSimulator.rate;
        const emi = LOAN.emi;
        const prepay = state.loanSimulator.prepayment;
        
        // Monthly extra prepayment
        const extraMonthly = prepay / 12;
        const simulatedEmi = emi + extraMonthly;

        // Baseline Amortization (no prepayment)
        const baseAmort = buildAmortization(outstanding, LOAN.rate, emi, 180); // max 15 years
        const baseInterestTotal = baseAmort.reduce((sum, r) => sum + r.interest, 0);

        // Simulated Amortization
        const simAmort = buildAmortization(outstanding, rate, simulatedEmi, 180);
        const simInterestTotal = simAmort.reduce((sum, r) => sum + r.interest, 0);
        const interestSaved = Math.max(0, baseInterestTotal - simInterestTotal);

        const payoffMonths = simAmort.length;
        // Start date: August 2026 (Month 8, 2026)
        const payoffDate = new Date(2026, 7 + payoffMonths); // 0-indexed month, 7 = August

        const dateStr = payoffDate.toLocaleDateString("en-IN", { month: "short", year: "numeric" });

        // Update UI Text values
        elements.loanPayoffDate.textContent = dateStr;
        elements.loanPayoffMonths.textContent = `${payoffMonths} months remaining`;
        elements.simPayoffDate.textContent = dateStr;
        
        animateValue(elements.simInterestSaved, interestSaved);

        // Update Sliders labels
        elements.prepaySliderVal.textContent = fmtC(prepay) + " / yr";
        elements.rateSliderVal.textContent = `${rate}%`;

        // stacked chart for 12-month emi
        const chartData = simAmort.slice(0, 12);
        
        if (state.charts.emiBreakdown) state.charts.emiBreakdown.destroy();
        const ctx = document.getElementById('emiBreakdownChart').getContext('2d');
        state.charts.emiBreakdown = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.map(d => `Month ${d.month}`),
                datasets: [
                    {
                        label: 'Interest',
                        data: chartData.map(d => d.interest),
                        backgroundColor: COLORS.coral
                    },
                    {
                        label: 'Principal',
                        data: chartData.map(d => d.principal),
                        backgroundColor: COLORS.teal
                    }
                ]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: {
                    x: { stacked: true, grid: { display: false }, ticks: { color: COLORS.textMuted, font: { size: 9 } } },
                    y: { stacked: true, grid: { color: '#1a2340' }, ticks: { color: COLORS.textMuted, font: { size: 9 }, callback: v => Math.round(v / 1000) + 'k' } }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // Area chart of loan balance
        const balanceData = simAmort.filter((_, idx) => idx % 6 === 0 || idx === simAmort.length - 1);
        
        if (state.charts.loanBalance) state.charts.loanBalance.destroy();
        const ctxBalance = document.getElementById('loanBalanceChart').getContext('2d');
        state.charts.loanBalance = new Chart(ctxBalance, {
            type: 'line',
            data: {
                labels: balanceData.map(d => `M${d.month}`),
                datasets: [{
                    label: 'Loan Balance',
                    data: balanceData.map(d => d.balance),
                    borderColor: COLORS.coral,
                    backgroundColor: 'rgba(255, 107, 107, 0.08)',
                    fill: true,
                    borderWidth: 2,
                    tension: 0.2,
                    pointRadius: 2
                }]
            },
            options: {
                plugins: { legend: { display: false } },
                scales: {
                    x: { grid: { display: false }, ticks: { color: COLORS.textMuted, font: { size: 9 } } },
                    y: { grid: { color: '#1a2340' }, ticks: { color: COLORS.textMuted, font: { size: 9 }, callback: v => Math.round(v / 100000) + 'L' } }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });
    };

    // Sliders event listeners
    elements.inputPrepayment.addEventListener('input', (e) => {
        state.loanSimulator.prepayment = parseFloat(e.target.value) || 0;
        renderLoanTab();
    });

    elements.inputLoanRate.addEventListener('input', (e) => {
        state.loanSimulator.rate = parseFloat(e.target.value) || 0;
        renderLoanTab();
    });

    // ── 4. TAX PLANNING TAB ──
    const renderTaxTab = () => {
        const taxData = TAX[state.taxYear];
        
        animateValue(elements.taxSec24b, taxData.sec24b);
        animateValue(elements.taxSec24bSave, Math.round(taxData.sec24b * 0.3));
        
        animateValue(elements.taxSec80c, taxData.sec80c_loan);
        animateValue(elements.taxSec80cEligible, Math.min(taxData.sec80c_loan, 150000));
        
        animateValue(elements.taxSec80d, taxData.sec80d);
        animateValue(elements.taxSec80dSave, Math.round(taxData.sec80d * 0.3));

        elements.taxSec24bSub.textContent = state.taxYear === "fy26" ? "~ Provisional" : "Actual · IDBI Bank cert.";
        elements.taxSec80cSub.textContent = state.taxYear === "fy26" ? "~ Provisional (₹1.5L max)" : "Actual · IDBI Bank cert.";
        elements.taxSummaryTitle.textContent = `Total Tax Deduction Summary — ${state.taxYear === "fy25" ? "FY 2024–25" : "FY 2025–26 (Provisional)"}`;

        const listData = [
            { label: "24(b) Home Loan Interest", val: taxData.sec24b, note: "Full amount", color: COLORS.blue },
            { label: "80C Principal (capped ₹1.5L)", val: Math.min(taxData.sec80c_loan, 150000), note: `of ${fmtC(taxData.sec80c_loan)} paid`, color: COLORS.teal },
            { label: "80D Health Insurance", val: taxData.sec80d, note: "Base premium only", color: COLORS.gold }
        ];

        elements.taxDeductionsContainer.innerHTML = listData.map((r, i) => `
            <div class="tax-row">
                <div class="tax-desc-wrapper">
                    <div class="tax-bar-indicator" style="background-color: ${r.color};"></div>
                    <div>
                        <div class="tax-title">${r.label}</div>
                        <div class="tax-sub">${r.note}</div>
                    </div>
                </div>
                <div class="tax-nums">
                    <div class="tax-val">${fmtC(r.val)}</div>
                    <div class="tax-saved-est" style="color: ${r.color};">≈ ${fmtC(Math.round(r.val * 0.3))} saved</div>
                </div>
            </div>
        `).join('');

        const totalDeductions = taxData.sec24b + Math.min(taxData.sec80c_loan, 150000) + taxData.sec80d;
        const totalSaved = Math.round(totalDeductions * 0.3);

        animateValue(elements.taxTotalDeductions, totalDeductions);
        elements.taxTotalSavings.textContent = `Est. Tax Saving: ${fmtC(totalSaved)}`;
    };

    // Tax Switchers click listeners
    elements.fySwitchers.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.fySwitchers.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.taxYear = btn.getAttribute('data-fy');
            renderTaxTab();
        });
    });

    // ── 5. GOALS TAB ──
    const renderGoalsTab = () => {
        const stats = getNetWorthStats();
        const currentPortfolioVal = stats.totalCurrent;
        
        elements.goalsProjectionSubtext.innerHTML = `Starting from current value of <strong>${fmtC(currentPortfolioVal)}</strong> (₹1,98,581 invested)`;

        // Growth projection formula
        const years = [0, 1, 2, 3, 4, 5, 7, 10, 15];
        const rates = [0.12, 0.15, 0.18];
        const labels = years.map(y => `Year ${y}`);

        const datasets = rates.map((r, rIdx) => {
            const color = [COLORS.blue, COLORS.gold, COLORS.teal][rIdx];
            return {
                label: `${r * 100}% CAGR`,
                data: years.map(y => Math.round(currentPortfolioVal * Math.pow(1 + r, y))),
                borderColor: color,
                backgroundColor: color,
                borderWidth: 2,
                pointRadius: 3,
                tension: 0.15,
                fill: false
            };
        });

        if (state.charts.growth) state.charts.growth.destroy();
        const ctx = document.getElementById('growthProjectionChart').getContext('2d');
        state.charts.growth = new Chart(ctx, {
            type: 'line',
            data: {
                labels,
                datasets
            },
            options: {
                plugins: {
                    legend: { labels: { color: COLORS.textMuted, font: { size: 10 } } }
                },
                scales: {
                    x: { grid: { display: false }, ticks: { color: COLORS.textMuted, font: { size: 9 } } },
                    y: { 
                        grid: { color: '#1a2340' }, 
                        ticks: { 
                            color: COLORS.textMuted, 
                            font: { size: 9 }, 
                            callback: v => {
                                if (v >= 10000000) return (v / 10000000).toFixed(1) + 'Cr';
                                if (v >= 100000) return (v / 100000).toFixed(0) + 'L';
                                return Math.round(v / 1000) + 'k';
                            }
                        } 
                    }
                },
                responsive: true,
                maintainAspectRatio: false
            }
        });

        // milestones lists
        const milestones = [
            { label: "5 Years @15%", val: Math.round(currentPortfolioVal * Math.pow(1.15, 5)), icon: "▲" },
            { label: "10 Years @15%", val: Math.round(currentPortfolioVal * Math.pow(1.15, 10)), icon: "▲▲" },
            { label: "15 Years @15%", val: Math.round(currentPortfolioVal * Math.pow(1.15, 15)), icon: "▲▲▲" },
            { label: "Loan-free Net Worth (est.)", val: Math.round(currentPortfolioVal * Math.pow(1.15, 5)), icon: "★" }
        ];

        elements.milestonesContainer.innerHTML = milestones.map(m => `
            <div class="milestone-item">
                <div class="milestone-label">
                    <span class="milestone-icon">${m.icon}</span>
                    <span>${m.label}</span>
                </div>
                <div class="milestone-val">${fmtC(m.val)}</div>
            </div>
        `).join('');
    };

    // Keep Checkboxes state persistent
    const initCheckboxes = () => {
        const checkboxes = document.querySelectorAll('.missing-checkbox');
        checkboxes.forEach(box => {
            const id = box.id;
            const checked = localStorage.getItem(`wealthos_${id}`) === 'true';
            box.checked = checked;
            
            box.addEventListener('change', () => {
                localStorage.setItem(`wealthos_${id}`, box.checked);
            });
        });
    };

    // ── INITIALIZATION ────────────────────────────────────────────────────────
    const init = () => {
        initTabs();
        initCheckboxes();
        
        // Initial rendering of Net Worth tab (default selected)
        renderChartsForTab("networth");
    };

    init();
});
