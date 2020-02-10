Java.perform(function () {
    var ivParameterSpec = Java.use('javax.crypto.spec.IvParameterSpec');
	ivParameterSpec.$init.overload('[B').implementation = function (a) {
        send("======================================");
        var result = this.$init(a)
        showStacks();
        send("iv向量(String):" + bytesToString(a));
		send("iv向量(Hex):" + bytesToHex(a));
		return result;
    }

    var cipher = Java.use('javax.crypto.Cipher');
	cipher.getInstance.overload('java.lang.String').implementation = function (a) {
        send("======================================");
        showStacks();
		send("填充模式：" + bytesToString(a));
		return this.getInstance(a);
    }

    cipher.getInstance.overload('java.lang.String', 'java.lang.String').implementation = function (a, b) {
        send("======================================");
        showStacks();
		send("填充模式：" + bytesToString(a));
		send("填充模块：" + bytesToString(b));
		return this.getInstance(a, b);
    }


    cipher.update.overload('[B').implementation = function (a) {
        send("======================================");
        var result = this.update(a)
		showStacks();
		send("update推入:" + bytesToString(a));
		return result;
    }
	cipher.update.overload('[B','int','int').implementation = function (a,b,c) {
        send("======================================");
        var result = this.update(a,b,c);
		showStacks();
		send("update推入:" + bytesToString(a) + "|" + b + "|" + c);
		return result;
    }
	cipher.doFinal.overload().implementation = function () {
        send("======================================");
		showStacks();
		var result = this.doFinal();
        send("doFinal(无参)");
		send("doFinal结果(Hex):" + bytesToHex(result));
		send("doFinal结果(Base64):" + bytesToBase64(result));
		return result;
    }
	cipher.doFinal.overload('[B').implementation = function (a) {
        send("======================================");
		showStacks();
		var result = this.doFinal(a);
		send("doFinal参数(String):" + bytesToString(a));
		send("doFinal结果(Hex):" + bytesToHex(result));
		send("doFinal结果(Base64):" + bytesToBase64(result));
		return result;
    }
});