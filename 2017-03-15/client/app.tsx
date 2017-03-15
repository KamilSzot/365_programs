fetch('/api')
.then(r => r.text())
.then((m) => {
    var e = document.createElement('div');
    e.innerText = m;
    document.body.appendChild(e);
});