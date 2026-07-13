(function() {
    let isAuthenticated = false;
    const authDataStr = localStorage.getItem('music_auth_session');
    if (authDataStr) {
        try {
            const authData = JSON.parse(authDataStr);
            const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
            if (authData.authenticated && (Date.now() - authData.timestamp < sevenDaysMs)) {
                isAuthenticated = true;
            } else {
                localStorage.removeItem('music_auth_session');
            }
        } catch (e) {
            localStorage.removeItem('music_auth_session');
        }
    }
    
    if (!isAuthenticated) {
        document.documentElement.classList.add('unauthorized');
        
        // Inject CSS style element to hide regular content immediately
        const style = document.createElement('style');
        style.id = 'auth-style';
        style.innerHTML = `
            html.unauthorized body {
                background: #121212 !important;
                color: #ffffff !important;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
                margin: 0 !important;
                padding: 0 !important;
                height: 100vh !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                overflow: hidden !important;
            }
            html.unauthorized body > *:not(#auth-login-container) {
                display: none !important;
            }
            #auth-login-container {
                background: rgba(25, 25, 25, 0.85) !important;
                backdrop-filter: blur(20px) !important;
                -webkit-backdrop-filter: blur(20px) !important;
                border: 1px solid rgba(255, 255, 255, 0.08) !important;
                padding: 2.5rem !important;
                border-radius: 20px !important;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6) !important;
                width: 90% !important;
                max-width: 400px !important;
                text-align: center !important;
                z-index: 999999 !important;
                box-sizing: border-box !important;
                animation: authFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) !important;
            }
            @keyframes authFadeIn {
                from { opacity: 0; transform: scale(0.95) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .auth-logo {
                width: 70px;
                height: auto;
                margin-bottom: 1.5rem;
            }
            #auth-login-container h2 {
                margin: 0 0 0.5rem 0 !important;
                font-size: 1.6rem !important;
                font-weight: 700 !important;
                letter-spacing: -0.5px !important;
                background: linear-gradient(135deg, #00d2ff, #2af598) !important;
                -webkit-background-clip: text !important;
                -webkit-text-fill-color: transparent !important;
            }
            #auth-login-container p {
                color: #a3a3a3 !important;
                font-size: 0.9rem !important;
                margin: 0 0 2rem 0 !important;
                line-height: 1.5 !important;
            }
            .auth-input-group {
                margin-bottom: 1.5rem !important;
                text-align: left !important;
            }
            .auth-input-group label {
                display: block !important;
                font-size: 0.75rem !important;
                color: #a3a3a3 !important;
                margin-bottom: 0.5rem !important;
                text-transform: uppercase !important;
                letter-spacing: 1px !important;
                font-weight: 600 !important;
            }
            #auth-password-input {
                width: 100% !important;
                padding: 12px 16px !important;
                background: rgba(255, 255, 255, 0.05) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 10px !important;
                color: #fff !important;
                font-size: 1rem !important;
                box-sizing: border-box !important;
                transition: all 0.2s ease !important;
            }
            #auth-password-input:focus {
                outline: none !important;
                border-color: #00d2ff !important;
                background: rgba(255, 255, 255, 0.08) !important;
                box-shadow: 0 0 0 3px rgba(0, 210, 255, 0.25) !important;
            }
            #auth-login-btn {
                width: 100% !important;
                padding: 12px !important;
                background: linear-gradient(135deg, #00d2ff, #2af598) !important;
                border: none !important;
                border-radius: 10px !important;
                color: #ffffff !important;
                font-size: 1rem !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                transition: all 0.2s ease !important;
                box-shadow: 0 4px 15px rgba(0, 210, 255, 0.3) !important;
            }
            #auth-login-btn:hover {
                transform: translateY(-1px) !important;
                box-shadow: 0 6px 20px rgba(0, 210, 255, 0.5) !important;
            }
            #auth-login-btn:active {
                transform: translateY(0) !important;
            }
            #auth-error-msg {
                color: #ef4444 !important;
                font-size: 0.85rem !important;
                margin-top: 1rem !important;
                min-height: 1.2rem !important;
                font-weight: 500 !important;
            }
        `;
        document.documentElement.appendChild(style);
        
        // Wait for DOM to load, then append the login modal
        document.addEventListener('DOMContentLoaded', () => {
            const loginContainer = document.createElement('div');
            loginContainer.id = 'auth-login-container';
            loginContainer.innerHTML = `
                <img class="auth-logo" src="img/favicon.png" onerror="this.src='img/logo.png'; this.onerror=null;" alt="Logo">
                <h2>Hệ thống Nội bộ</h2>
                <p>Trang web này được bảo vệ. Vui lòng nhập mật khẩu quản trị viên để truy cập.</p>
                <div class="auth-input-group">
                    <label for="auth-password-input">Mật khẩu</label>
                    <input type="password" id="auth-password-input" placeholder="Nhập mật khẩu..." autofocus>
                </div>
                <button id="auth-login-btn">Đăng nhập</button>
                <div id="auth-error-msg"></div>
            `;
            document.body.appendChild(loginContainer);
            
            const input = document.getElementById('auth-password-input');
            const button = document.getElementById('auth-login-btn');
            const errorMsg = document.getElementById('auth-error-msg');
            
            async function handleLogin() {
                const password = input.value;
                if (!password) {
                    errorMsg.textContent = 'Vui lòng nhập mật khẩu';
                    return;
                }
                
                // SHA-256 Hashing using browser Web Crypto API
                const msgBuffer = new TextEncoder().encode(password);
                const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                
                // Mật khẩu:  -> SHA256: 537cd36724e7005280a9f2e11e47487efa9d017b53704006dfb6930f83b8ca69
                const targetHash = '537cd36724e7005280a9f2e11e47487efa9d017b53704006dfb6930f83b8ca69';
                
                if (hashHex === targetHash) {
                    const sessionData = {
                        authenticated: true,
                        timestamp: Date.now()
                    };
                    localStorage.setItem('music_auth_session', JSON.stringify(sessionData));
                    document.documentElement.classList.remove('unauthorized');
                    const authStyle = document.getElementById('auth-style');
                    if (authStyle) authStyle.remove();
                    loginContainer.remove();
                    window.location.reload();
                } else {
                    errorMsg.textContent = 'Mật khẩu không chính xác!';
                    input.value = '';
                    input.focus();
                }
            }
            
            button.addEventListener('click', handleLogin);
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    handleLogin();
                }
            });
        });
    }
})();
