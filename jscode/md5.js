Java.perform(function () {
    var md = Java.use('java.security.MessageDigest');
    md.getInstance.overload('java.lang.String','java.lang.String').implementation = function (a,b) {
        send("======================================");
		showStacks();
		send("算法名：" + a);
		return this.getInstance(a, b);
    }
	md.getInstance.overload('java.lang.String').implementation = function (a) {
	    send("======================================");
		showStacks();
		send("算法名：" + a);
		return this.getInstance(a);
    }

	md.update.overload('[B').implementation = function (a) {
        send("======================================");
        this.update(a);
		showStacks();
		send("update推入:" + bytesToString(a));
    }
	md.update.overload('[B','int','int').implementation = function (a,b,c) {
	    send("======================================");
        this.update(a,b,c);
		showStacks();
		send("update推入:" + bytesToString(a) + "|" + b + "|" + c);
    }

	md.digest.overload().implementation = function () {
        send("======================================");
		showStacks();
		var result = this.digest();
		send("digest(无参)");
		send("digest结果(Hex):" + bytesToHex(result));
		send("digest结果(Base64):" + bytesToBase64(result));
		return result;
    }

	md.digest.overload('[B').implementation = function (a) {
        send("======================================");
		showStacks();
		send("digest参数(String):" + bytesToString(a));
		var result = this.digest(a);
		send("digest结果(Hex):" + bytesToHex(result));
		send("digest结果(Base64):" + bytesToBase64(result));
		return result;
    }
});