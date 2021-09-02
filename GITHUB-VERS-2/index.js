class GithubApiWidget {

	constructor(options = {}) {
		this.options = {
			container: "#github-user-repositories-widget"
		};
		Object.assign(this.options, options);

		this.apiUrl = "https://api.github.com";
		this.userRepositoriesEndpoint = "/users/:username/repos";
		this.elements = {};
		this.init();
	}

	init() {
		this.elements.container = document.querySelector(this.options.container);
		this.elements.container.innerHTML = this.parseInitialTemplate();
		this.elements.form = this.elements.container.querySelector(".github-widget-form");
		this.elements.input = this.elements.container.querySelector(".github-widget-input");
		this.elements.list = this.elements.container.querySelector(".github-widget-repositories");
		this.registerEvents();
	}

	registerEvents() {
		this.elements.form.addEventListener("submit", e => {
			e.preventDefault();
			const username = this.elements.input.value.trim();
			this.getRepositories(username, rawRepositories => {
				const repositories = this.filterRepositoryResults(rawRepositories);
				const html = this.parseListTemplate(repositories);
				this.elements.list.innerHTML = html;
			});
		});
	}

	getRepositories(username, callback) {
		const url = `${this.apiUrl}${this.userRepositoriesEndpoint}`.replace(":username", encodeURIComponent(username));
		fetch(url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				callback(data);
			})
	}

	filterRepositoryResults(repositoryData) {
		const repositories = repositoryData.map(repository => {
			return {
				name: repository.name,
                url: repository.html_url
			};
		});
		return repositories;
	}

	parseInitialTemplate() {
		return `
      <form class="github-widget-form">
        <input type="text" class="github-widget-input" placeholder="GitHub User Name">
        <button type="submit">Find Repositories</button>
      </form>
      <div class="github-widget-repositories"></div>
    `;
	}

	parseListTemplate(repositories) {
		return `
      <ul>
        ${repositories.map(repository => `<li><a href="${repository.url}" target="_blank"> ${repository.name} </a></li>`).join("")}
      </ul>
    `;
	}

	static instantiate(container) {
		new GithubApiWidget({ container });
	}
}

GithubApiWidget.instantiate('#repositories_001');
GithubApiWidget.instantiate('#repositories_002');
GithubApiWidget.instantiate('#repositories_003');
GithubApiWidget.instantiate('#repositories_004');