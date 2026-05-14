import { useState } from "react";
import barca from "../assets/images/barca.jpg";
import combo from "../assets/images/combo.jpeg";
import dragao from "../assets/images/dragao.jpg";
import kids from "../assets/images/kids.jpg";
import Niguiri from "../assets/images/Niguiri.jpg";
import Temaki from "../assets/images/Temaki.jpg";
import hotroll from "../assets/images/hotroll.jpg";
import gyozaFrito from "../assets/images/gyozaFrito.jpg";
import rodíziofamilia from "../assets/images/rodíziofamilia.jpg";
import rodízioduplo from "../assets/images/rodízioduplo.jpg";
import rodízioindividual from "../assets/images/rodízioindividual.jpeg";
import kithashi from "../assets/images/kithashi.jpg";
import tapete from "../assets/images/tapete.jpeg";
import kitcompleto from "../assets/images/kitcompleto.jpeg";
import kitpratos from "../assets/images/kitpratos.jpg";

const DB = {
  categories: [
    { id: 1, slug: "combos", name: "Combos & Barcas", icon: "" },
    { id: 2, slug: "pecas", name: "Peças Soltas", icon: "" },
    { id: 3, slug: "rodizio", name: "Rodízio em Casa", icon: "" },
    { id: 4, slug: "utensilios", name: "Utensílios", icon: "" },
  ],
  products: [
    {
      id: 1,
      categoryId: 1,
      name: "Barca Imperial",
      desc: "40 peças variadas",
      price: 99.9,
      img: barca,
    },

    {
      id: 2,
      categoryId: 1,
      name: "Combo Sakura",
      desc: "30 peças: hot rolls, niguiris e temakis especiais",
      price: 69.9,
      badge: null,
      img: combo,
      tag: null,
    },
    {
      id: 3,
      categoryId: 1,
      name: "Barca Dragão",
      desc: "80 peças premium com wagyu e vieira grelhada",
      price: 139.9,
      badge: "🔥 Premium",
      img: dragao,
      tag: null,
    },
    {
      id: 4,
      categoryId: 1,
      name: "Combo Kids",
      desc: "20 peças suaves: califórnia, hossomaki e gyoza",
      price: 54.9,
      badge: "🆕 Novidade",
      img: kids,
      tag: null,
    },
    {
      id: 5,
      categoryId: 2,
      name: "Niguiri Salmão (8un)",
      desc: "Salmão fresco sobre arroz temperado com wasabi suave",
      price: 32.9,
      badge: null,
      img: Niguiri,
      tag: null,
    },
    {
      id: 6,
      categoryId: 2,
      name: "Temaki de Atum",
      desc: "Cone crocante com atum fresco, cream cheese e cebolinha",
      price: 24.9,
      badge: null,
      img: Temaki,
      tag: null,
    },
    {
      id: 7,
      categoryId: 2,
      name: "Hot Roll Philadelphia (8un)",
      desc: "Empanado crocante com salmão, cream cheese e avocado",
      price: 29.9,
      badge: null,
      img: hotroll,
      tag: null,
    },
    {
      id: 8,
      categoryId: 2,
      name: "Gyoza Frito (6un)",
      desc: "Pastel japonês recheado com carne suína e gengibre",
      price: 22.9,
      badge: "❤️ Favorito",
      img: gyozaFrito,
      tag: null,
    },
    {
      id: 9,
      categoryId: 3,
      name: "Rodízio Família (4 pessoas)",
      desc: "Ilimitado por 2h: 60 tipos de peças + sobremesa mochi",
      price: 299.9,
      badge: "🏠 Para Casa",
      img: rodíziofamilia,
      tag: null,
    },
    {
      id: 10,
      categoryId: 3,
      name: "Rodízio Duplo",
      desc: "Ilimitado por 2h para 2 pessoas + missoshiru incluso",
      price: 159.9,
      badge: "💑 Casal",
      img: rodízioduplo,
      tag: null,
    },
    {
      id: 11,
      categoryId: 3,
      name: "Rodízio Executivo (1 pessoa)",
      desc: "Ilimitado por 1h30 com + de 40 opções e sobremesa",
      price: 89.9,
      badge: null,
      img: rodízioindividual,
      tag: null,
    },
    {
      id: 12,
      categoryId: 4,
      name: "Kit Hashi Premium",
      desc: "Par de hashis em madeira de bambu natural lacado",
      price: 169.9,
      badge: null,
      img: kithashi,
      tag: null,
    },
    {
      id: 13,
      categoryId: 4,
      name: "Tapete de Enrolar Sushi",
      desc: "Makisu tradicional em bambu + guia para iniciantes",
      price: 34.9,
      badge: null,
      img: tapete,
      tag: null,
    },
    {
      id: 14,
      categoryId: 4,
      name: "Kit Completo para Sushi",
      desc: "Faca yanagiba, makisu, colher de madeira e bowl",
      price: 389.9,
      badge: "🎁 Kit Completo",
      img: kitcompleto,
      tag: null,
    },
    {
      id: 15,
      categoryId: 4,
      name: "Jogo de Pratos Temáticos",
      desc: "6 pratos de cerâmica com estampas de koi e cerejeira",
      price: 269.9,
      badge: null,
      img: kitpratos,
      tag: null,
    },
  ],
};

export default function SushiTech() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = DB.products.filter((p) => {
    const catMatch =
      activeCategory === "all" ||
      DB.categories.find((c) => c.slug === activeCategory)?.id === p.categoryId;
    const searchMatch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return catMatch && searchMatch;
  });

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...product, qty: 1 }];
    });
    setNotification(`${product.name} adicionado! 🛒`);
    setTimeout(() => setNotification(null), 2500);
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));
  const updateQty = (id, delta) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        {/* HEADER */}
        <header className="header">
          <div className="header-inner">
            <div className="logo">
              Sushi<span>Tech</span>
            </div>
            <div className="search-wrap">
              <span className="search-icon"></span>
              <input
                className="search-input"
                placeholder=""
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              🛒 Carrinho
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="hero-tag"> Experiência Tradição</div>
          <h1>
            Arte Japonesa,
            <br />
            entregue na sua <em>mesa</em>
          </h1>
          <p>
            Peças frescas, combos exclusivos e o melhor rodízio em domicílio de
            Minas Gerais
          </p>
          <button
            className="hero-cta"
            onClick={() => {
              setActiveCategory("all");

              document
                .querySelector(".products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Ver Cardápio Completo →
          </button>
        </section>

        {/* CATEGORIES */}
        <section className="categories">
          <div className="cat-list">
            <button
              className={`cat-btn ${activeCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveCategory("all")}
            >
              Todos
            </button>
            {DB.categories.map((c) => (
              <button
                key={c.id}
                className={`cat-btn ${activeCategory === c.slug ? "active" : ""}`}
                onClick={() => setActiveCategory(c.slug)}
              >
                {c.icon} {c.name}
              </button>
            ))}
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="products">
          <h2 className="section-title">
            {activeCategory === "all"
              ? "Cardápio Completo"
              : DB.categories.find((c) => c.slug === activeCategory)?.icon +
                " " +
                DB.categories.find((c) => c.slug === activeCategory)?.name}
          </h2>
          {filtered.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "48px", color: "#555" }}
            >
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
              <p>Nenhum produto encontrado para "{searchTerm}"</p>
            </div>
          ) : (
            <div className="grid">
              {filtered.map((p) => (
                <div key={p.id} className="card">
                  <div className="card-img">
                    <img src={p.img} alt={p.name} className="food-image" />
                    {p.badge && <span className="card-badge">{p.badge}</span>}
                  </div>

                  <div className="card-body">
                    <div className="card-name">{p.name}</div>
                    <div className="card-desc">{p.desc}</div>
                    <div className="card-footer">
                      <span className="price">R$ {p.price.toFixed(2)}</span>
                      <button
                        className="add-btn"
                        onClick={() => addToCart(p)}
                        aria-label={`Adicionar ${p.name}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <p>
            <span>Sushi Tech</span> — Culinária Japonesa Autêntica · Poços de
            Caldas - MG
          </p>

          <p>Desenvolvedor Lucas Maicon &lt;/&gt;</p>
        </footer>

        {/* NOTIFICATION */}
        {notification && <div className="notification">✅ {notification}</div>}

        {/* CART PANEL */}
        {cartOpen && (
          <div
            className="cart-overlay"
            onClick={(e) => e.target === e.currentTarget && setCartOpen(false)}
          >
            <div className="cart-panel">
              <div className="cart-header">
                <h2>🛒 Seu Carrinho</h2>
                <button
                  className="close-btn"
                  onClick={() => setCartOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div className="cart-items">
                {cart.length === 0 ? (
                  <div className="cart-empty">
                    <div style={{ fontSize: 48 }}>🍱</div>
                    <p>
                      Seu carrinho está vazio.
                      <br />
                      Que tal adicionar um combo delicioso?
                    </p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="cart-item-img"
                      />

                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">
                          R$ {(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>
                      <div className="qty-ctrl">
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.id, -1)}
                        >
                          −
                        </button>
                        <span className="qty-num">{item.qty}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateQty(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="del-btn"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remover"
                      >
                        🗑
                      </button>
                    </div>
                  ))
                )}
              </div>
              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total do pedido</span>
                  <span>R$ {cartTotal.toFixed(2)}</span>
                </div>
                <button
                  className="checkout-btn"
                  disabled={cart.length === 0}
                  onClick={() => {
                    alert(
                      "🎉 Pedido confirmado! Em breve entraremos em contato. Obrigado por escolher a Sushi Tech!",
                    );
                    setCart([]);
                    setCartOpen(false);
                  }}
                >
                  Finalizar Pedido 
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=DM+Sans:wght@300;400;500;600&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0a0a0a; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #111; }
::-webkit-scrollbar-thumb { background: #c0392b; border-radius: 2px; }
.app { font-family: 'DM Sans', sans-serif; background: #0a0a0a; min-height: 100vh; color: #e8e0d5; }
.header { background: #0d0d0d; border-bottom: 1px solid #1e1e1e; position: sticky; top: 0; z-index: 100; }
.header-inner { max-width: 1200px; margin: 0 auto; padding: 0 20px; height: 64px; display: flex; align-items: center; gap: 16px; }
.logo { font-family: 'Noto Serif JP', serif; font-size: 22px; color: #e8e0d5; letter-spacing: -0.5px; display: flex; align-items: center; gap: 8px; flex: 0 0 auto; }
.logo span { color: #c0392b; }
.search-wrap { flex: 1; max-width: 380px; margin: 0 auto; position: relative; }
.search-input { width: 100%; background: #161616; border: 1px solid #222; border-radius: 8px; padding: 8px 14px 8px 36px; color: #e8e0d5; font-size: 14px; outline: none; transition: border-color 0.2s; font-family: 'DM Sans', sans-serif; }
.search-input:focus { border-color: #c0392b; }
.search-input::placeholder { color: #555; }
.search-icon { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #555; font-size: 15px; }
.cart-btn { background: #c0392b; border: none; border-radius: 8px; color: #fff; padding: 8px 16px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; display: flex; align-items: center; gap: 8px; transition: background 0.2s; flex: 0 0 auto; }
.cart-btn:hover { background: #a93226; }
.cart-badge { background: #fff; color: #c0392b; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; }
.hero { background: linear-gradient(135deg, #0d0d0d 0%, #130606 60%, #1a0808 100%); padding: 48px 20px; text-align: center; border-bottom: 1px solid #1a0a0a; position: relative; overflow: hidden; }
.hero::before { content: ''; position: absolute; top: -50%; left: -20%; width: 60%; height: 200%; background: radial-gradient(ellipse, rgba(192,57,43,0.08) 0%, transparent 70%); pointer-events: none; }
.hero-tag { display: inline-block; background: rgba(192,57,43,0.15); border: 1px solid rgba(192,57,43,0.3); color: #e07060; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px; }
.hero h1 { font-family: 'Noto Serif JP', serif; font-size: clamp(28px, 5vw, 48px); color: #e8e0d5; line-height: 1.2; margin-bottom: 12px; }
.hero h1 em { color: #c0392b; font-style: normal; }
.hero p { color: #888; font-size: 16px; max-width: 460px; margin: 0 auto 24px; }
.hero-cta { background: #c0392b; color: #fff; border: none; border-radius: 8px; padding: 12px 28px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: all 0.2s; }
.hero-cta:hover { background: #a93226; transform: translateY(-1px); }
.categories { max-width: 1200px; margin: 0 auto; padding: 28px 20px 0; }
.cat-list { display: flex; gap: 18px; flex-wrap: wrap; justify-content: center; margin-top: 10px;}
.cat-btn { background: #161616; border: 1px solid #222; border-radius: 8px; color: #888; padding: 8px 16px; cursor: pointer; font-family: 'DM Sans', sans-serif; font-size: 14px; transition: all 0.2s; white-space: nowrap; }
.cat-btn:hover { border-color: #444; color: #ccc; }
.cat-btn.active { background: rgba(192,57,43,0.15); border-color: #c0392b; color: #e07060; }
.products { max-width: 1200px; margin: 0 auto; padding: 28px 20px 80px; }
.section-title { font-family: 'Noto Serif JP', serif; font-size: 20px; color: #e8e0d5; margin-bottom: 20px; display: flex; align-items: center; gap: 10px; }
.section-title::after { content: ''; flex: 1; height: 1px; background: #1e1e1e; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px;}
.card { background: #111; border: 1px solid #1e1e1e; border-radius: 12px; overflow: hidden; transition: all 0.2s; cursor: pointer;}
.card:hover { border-color: #333; transform: translateY(-2px); }
.card-img { background: #161616; height: 220px; overflow: hidden; position: relative; }
.food-image {width: 100%; height: 100%;object-fit: cover;display: block;}
.food-image { width: 100%; height: 100%; object-fit: cover; display: block; }
.card-badge { position: absolute; top: 8px; right: 8px; background: rgba(192,57,43,0.9); color: #fff; font-size: 11px; padding: 3px 8px; border-radius: 20px; }
.card-body { padding: 14px; }
.card-name { font-weight: 600; font-size: 15px; color: #e8e0d5; margin-bottom: 4px; }
.card-desc { font-size: 12px; color: #666; line-height: 1.5; margin-bottom: 12px; }
.card-footer { display: flex; align-items: center; justify-content: space-between; }
.price { font-family: 'Noto Serif JP', serif; font-size: 18px; color: #c0392b; font-weight: 700; }
.add-btn { background: #c0392b; border: none; border-radius: 7px; color: #fff; width: 34px; height: 34px; cursor: pointer; font-size: 20px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
.add-btn:hover { background: #a93226; }
.notification { position: fixed; top: 80px; right: 20px; background: #1a1a1a; border: 1px solid #c0392b; border-radius: 10px; padding: 12px 18px; color: #e8e0d5; font-size: 14px; z-index: 999; box-shadow: 0 4px 20px rgba(0,0,0,0.5); animation: slideIn 0.3s ease; }
@keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
.cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); z-index: 200; display: flex; justify-content: flex-end; }
.cart-panel { background: #0d0d0d; border-left: 1px solid #1e1e1e; width: 100%; max-width: 400px; display: flex; flex-direction: column; animation: slideCart 0.25s ease; }
@keyframes slideCart { from { transform: translateX(100%); } to { transform: translateX(0); } }
.cart-header { padding: 20px; border-bottom: 1px solid #1e1e1e; display: flex; align-items: center; justify-content: space-between; }
.cart-header h2 { font-family: 'Noto Serif JP', serif; font-size: 18px; }
.close-btn { background: #1a1a1a; border: 1px solid #222; border-radius: 7px; color: #aaa; width: 32px; height: 32px; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; }
.close-btn:hover { color: #e8e0d5; border-color: #444; }
.cart-items { flex: 1; overflow-y: auto; padding: 16px; display: flex; flex-direction: column; gap: 10px; }
.cart-empty { text-align: center; padding: 40px 20px; color: #555; }
.cart-empty p { font-size: 14px; margin-top: 8px; }
.cart-item { background: #141414; border: 1px solid #1e1e1e; border-radius: 10px; padding: 12px; display: flex; gap: 10px; align-items: center; }
.cart-item-img { width: 60px; height: 60px; object-fit: cover;border-radius: 8px; border: 1px solid #222;}
.cart-item-info { flex: 1; min-width: 0; }
.cart-item-name { font-size: 13px; font-weight: 500; color: #e8e0d5; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.cart-item-price { font-size: 13px; color: #c0392b; font-weight: 600; margin-top: 2px; }
.qty-ctrl { display: flex; align-items: center; gap: 6px; }
.qty-btn { background: #222; border: none; border-radius: 5px; color: #e8e0d5; width: 24px; height: 24px; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; }
.qty-btn:hover { background: #333; }
.qty-num { font-size: 14px; min-width: 20px; text-align: center; }
.del-btn { background: transparent; border: none; color: #555; cursor: pointer; font-size: 16px; padding: 4px; }
.del-btn:hover { color: #c0392b; }
.cart-footer { padding: 20px; border-top: 1px solid #1e1e1e; }
.cart-total { display: flex; justify-content: space-between; margin-bottom: 16px; }
.cart-total span:first-child { color: #888; font-size: 14px; }
.cart-total span:last-child { font-family: 'Noto Serif JP', serif; font-size: 20px; color: #c0392b; font-weight: 700; }
.checkout-btn { width: 100%; background: #c0392b; border: none; border-radius: 9px; color: #fff; padding: 14px; font-size: 15px; font-weight: 600; cursor: pointer; font-family: 'DM Sans', sans-serif; transition: background 0.2s; }
.checkout-btn:hover { background: #a93226; }
.checkout-btn:disabled { background: #333; color: #666; cursor: not-allowed; }
.footer { border-top: 1px solid #161616; padding: 24px 20px; text-align: center; color: #333; font-size: 13px; }
.footer span { color: #c0392b; }
@media (max-width: 600px) { .header-inner { gap: 10px; } .logo { font-size: 18px; } .hero { padding: 36px 16px; } .cart-panel { max-width: 100%; }}`;
