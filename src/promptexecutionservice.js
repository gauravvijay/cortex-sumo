class PromptExecutionService {
    register(iframe, localStorage);
    async execute(url, prompt, return_type) {
        return new Promise((resolve, reject) => {
            const interval = setInterval(() => {
              const status = PromptPersistenceService.get(url, prompt).status;
              if (status === "DONE") {
                clearInterval(interval);
                resolve();
              }
            }, 3000);
          });
    }
    getAllPrompts();
    getNextPrompt();
}

class PromptPersistenceService {
    add(url, prompt, return_type) {
        localStorage.setItem(JSON.stringify({
            url: url,
            prompt: prompt
        }), JSON.stringify({
            return_type: return_type,
            status: "SCHEDULED"
        }));
    }

    finish(url, prompt, ret_val) {
        item = get(url, prompt);
        item.ret_val = ret_val;
        item.status = "DONE";
        localStorage.setItem(JSON.stringify({
            url: url,
            prompt: prompt
        }, JSON.stringify(item)));
    }

    updateStatus(url, prompt, status) {
        item = get(url, prompt);
        item.status = status;
        localStorage.setItem(JSON.stringify({
            url: url,
            prompt: prompt
        }, JSON.stringify(item)));
    }

    get(url, prompt) {
        return JSON.parse(localStorage.getItem(
            JSON.stringify({
                url: url,
                prompt: prompt
            })
        ));
    }
}