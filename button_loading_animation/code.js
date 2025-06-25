const button = document.getElementById('button');
const loading = document.getElementById('loading');

button.addEventListener('click', function () {
    loading.style.display = 'inline-block';
    button.disabled = true;
    button.style.opacity = '0.7';
    setTimeout(() => {
        loading.style.display = 'none';
        button.disabled = false;
        button.style.opacity = '1';
    }, 2000); 
});
