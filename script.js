// スムーススクロール & フォーム自動選択
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // data-interest属性がある場合、フォームの該当項目を選択
        const interestValue = this.getAttribute('data-interest');
        if (interestValue && target && target.id === 'contact-form') {
            setTimeout(() => {
                const interestSelect = document.getElementById('interest');
                if (interestSelect) {
                    interestSelect.value = interestValue;
                    // 選択された項目をハイライト
                    interestSelect.style.borderColor = '#e94560';
                    interestSelect.style.boxShadow = '0 0 0 3px rgba(233, 69, 96, 0.1)';
                    setTimeout(() => {
                        interestSelect.style.borderColor = '';
                        interestSelect.style.boxShadow = '';
                    }, 2000);
                }
            }, 500);
        }
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ヘッダーのスクロール時の背景変化
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// モバイルメニュー
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('.nav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
}

// フォーム送信処理（デモ版）
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // 実際のプロジェクトでは、ここでバックエンドにデータを送信
        console.log('フォームデータ:', data);
        
        // 成功メッセージの表示（デモ）
        alert('お問い合わせいただきありがとうございます。\n1営業日以内にご返信いたします。');
        
        // フォームのリセット
        contactForm.reset();
    });
}

// スクロールアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// アニメーション対象の要素を監視
const animateElements = document.querySelectorAll('.challenge-card, .benefit-card, .use-case-card, .workshop-step, .trust-item, .flow-step');
animateElements.forEach(el => observer.observe(el));

// 読み込み完了時の処理
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// CTA ボタンのクリックイベント追跡（アナリティクス用）
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const btnText = e.target.textContent.trim();
        console.log('CTA クリック:', btnText);
        
        // Google Analytics などのイベント送信をここに追加可能
        // gtag('event', 'click', {
        //     'event_category': 'CTA',
        //     'event_label': btnText
        // });
    });
});

// ナビゲーションのアクティブ状態管理
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a[href^="#"]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// レスポンシブ対応: ウィンドウリサイズ時の処理
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // ウィンドウサイズが変更された際の処理
        if (window.innerWidth > 768) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }, 250);
});

// フォームバリデーション強化
const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.hasAttribute('required') && !input.value.trim()) {
            input.style.borderColor = '#e74c3c';
        } else {
            input.style.borderColor = '';
        }
    });
    
    input.addEventListener('input', () => {
        if (input.style.borderColor === 'rgb(231, 76, 60)') {
            input.style.borderColor = '';
        }
    });
});

// メールアドレスのバリデーション
const emailInput = document.getElementById('email');
if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value && !emailRegex.test(emailInput.value)) {
            emailInput.style.borderColor = '#e74c3c';
            // エラーメッセージの表示（オプション）
        } else {
            emailInput.style.borderColor = '';
        }
    });
}

// スクロール進行度インジケーター（オプション機能）
function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #3498DB, #667eea);
        width: 0%;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// スクロール進行度バーを有効化（必要に応じてコメントアウトを外す）
// createScrollProgressBar();

// パフォーマンス最適化: 画像の遅延読み込み（Lazy Loading）
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ページ離脱時の確認（フォーム入力中の場合）
let formTouched = false;

if (contactForm) {
    contactForm.addEventListener('input', () => {
        formTouched = true;
    });
    
    contactForm.addEventListener('submit', () => {
        formTouched = false;
    });
    
    window.addEventListener('beforeunload', (e) => {
        if (formTouched) {
            e.preventDefault();
            e.returnValue = '';
            return '';
        }
    });
}

console.log('企業向けアートワークショップサイト initialized');
