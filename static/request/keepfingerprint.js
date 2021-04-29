if (window.requestIdleCallback && typeof Fingerprint2 === 'function') {
    requestIdleCallback(function() {
        Fingerprint2.get(function(components) {
            var fingerprint = window.btoa(window.btoa(JSON.stringify(components))).substring(0, 128);
            window.localBetools.storage.setItem('system_fingerprint', fingerprint);
            console.log(`fingerprint : ${fingerprint}`);
        });
    });
} else if (typeof Fingerprint2 === 'function') {
    setImmediate(function() {
        Fingerprint2.get(function(components) {
            var fingerprint = window.btoa(window.btoa(JSON.stringify(components))).substring(0, 128);
            window.localBetools.storage.setItem('system_fingerprint', fingerprint);
            console.log(`fingerprint : ${fingerprint}`);
        });
    });
}