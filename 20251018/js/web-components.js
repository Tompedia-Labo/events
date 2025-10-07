// 要素の動作を定義するクラス
class WebComponent extends HTMLElement {
  // 自身の要素名をidにもつtemplate要素を探して、その内容を自身にコピーする
  constructor() {
    super();
    const templateId = this.nodeName.toLowerCase();
    const template = document.getElementById(templateId);
    if (template) {
      this.attachShadow({ mode: 'open' }).appendChild(
        template.content.cloneNode(true)
      );
    } else {
      console.error(`Template with id "${templateId}" not found.`);
    }
  }
}

// ページ内のtemplate要素を探して、カスタム要素として登録する関数
function defineWebComponents() {
  const templates = document.querySelectorAll('template[id]');
  templates.forEach(template => {
    const componentName = template.id;
    if (!customElements.get(componentName)) {
      customElements.define(componentName, class extends WebComponent {});
    }
  });
}

// 準備ができたらコンポーネントを定義
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', defineWebComponents);
} else {
  defineWebComponents();
}
