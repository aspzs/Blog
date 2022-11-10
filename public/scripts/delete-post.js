async function deleteFormHandler(event) {
    event.preventDefault();
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];

        const response = await fetch('/api/users/login', {
            method: 'DELETE'
            });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
}

document.querySelector('.delete-post-form').addEventListener('submit', deleteFormHandler);
