import { Component } from '../core/component';
import { apiService } from '../service/api.service';
import { renderPost } from '../template/post.template';

export class FavoriteComponent extends Component {
  constructor(id, { loader }) {
    super(id);
    this.loader = loader;
  }
  init() {
    this.$el.addEventListener('click', linkClickHandler.bind(this));
  }
  onShow() {
    const favorites = JSON.parse(localStorage.getItem('favorites'));
    const html = renderList(favorites);
    this.$el.innerHTML = '';
    this.$el.insertAdjacentHTML('afterbegin', html);
  }
  onHide() {
    this.$el.innerHTML = '';
  }
}

async function linkClickHandler(event) {
  event.preventDefault();
  if (event.target.classList.contains('js-link')) {
    const postId = event.target.dataset.post;
    this.$el.innerHTML = '';
    this.loader.show();
    const post = await apiService.fetchPostsById(postId);
    this.loader.hide();
    this.$el.insertAdjacentHTML('afterbegin', renderPost(post, false));
  }
}

function renderList(list = []) {
  if (list && list.length) {
    return `
    <ul>
    ${list
      .map(
        (i) =>
          `<li><a href="#" class="js-link" data-post="${i.id}">${i.title}</a></li>`
      )
      .join('')}
    </ul>
    `;
  }
  return `<p class="center">Вы пока ничего не добавили</p>`;
}
