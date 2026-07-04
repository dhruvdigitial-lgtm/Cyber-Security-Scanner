function scanWebsite() {

    const website = document.getElementById("website").value.trim();
    const result = document.getElementById("result");

    if (website === "") {
        result.innerHTML = `
            <h2>Scan Result</h2>
            <p class="warning">❌ Please enter a website URL.</p>
        `;
        return;
    }

    let score = 100;
    let httpsStatus = "";
    let recommendation = "";

    try {

        const url = new URL(website);

        if (url.protocol === "https:") {
            httpsStatus = "<span class='success'>✅ HTTPS Enabled</span>";
        } else {
            httpsStatus = "<span class='warning'>❌ HTTP (Not Secure)</span>";
            score -= 40;
        }

        if (url.hostname.length < 4) {
            score -= 20;
        }

        if (score >= 80) {
            recommendation = "🟢 This website appears secure.";
        } else if (score >= 50) {
            recommendation = "🟡 This website is moderately secure.";
        } else {
            recommendation = "🔴 This website is not secure. Use HTTPS.";
        }

        result.innerHTML = `
            <h2>Scan Result</h2>

            <p><b>Website:</b> ${website}</p>

            <p><b>Connection:</b> ${httpsStatus}</p>

            <p><b>Security Score:</b> ${score}/100</p>

            <p><b>Recommendation:</b> ${recommendation}</p>
        `;

    } catch {

        result.innerHTML = `
            <h2>Scan Result</h2>

            <p class="warning">
                ❌ Invalid Website URL
            </p>

            <p>
                Example:
                https://google.com
            </p>
        `;
    }

}