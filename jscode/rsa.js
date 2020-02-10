Java.perform(function () {

    // 密钥 base64
    var x509EncodedKeySpec = Java.use('java.security.spec.X509EncodedKeySpec');
	x509EncodedKeySpec.$init.overload('[B').implementation = function (a) {
        send("======================================");
        var result = this.$init(a);
        showStacks();
        send("算法名：RSA");
        send("RSA钥匙(Base64):" + bytesToBase64(a));
		return result;
    }

    // 密钥 hex 16进制
    var rSAPublicKeySpec = Java.use('java.security.spec.RSAPublicKeySpec');
    rSAPublicKeySpec.$init.overload('java.math.BigInteger', 'java.math.BigInteger').implementation = function (a, b) {
        send("======================================");
        var result = this.$init(a,b);
        showStacks();
        send("算法名：RSA(Hex版)");
        send("RSA钥匙N(16进制Hex):" + a.toString(16));
        send("RSA钥匙E(16进制Hex):" + b.toString(16));
		return result;
    }
});