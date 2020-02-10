Java.perform(function () {
    var mac = Java.use('javax.crypto.Mac');
	mac.getInstance.overload('java.lang.String').implementation = function (a) {
        send("======================================");
		var result = this.getInstance(a);
        showStacks();
		send("算法名：" + a);
		return result;
    }

    mac.update.overload('[B').implementation = function (a) {
        send("======================================");
        this.update(a);
		showStacks();
		send("update推入:" + bytesToString(a))
    }
	mac.update.overload('[B','int','int').implementation = function (a,b,c) {
        send("======================================");
        this.update(a,b,c)
		showStacks();
		send("update推入:" + bytesToString(a) + "|" + b + "|" + c);
    }
	mac.doFinal.overload().implementation = function () {
        send("======================================");
		showStacks();
		var result = this.doFinal();
        send("doFinal(无参)");
		send("doFinal结果(Hex):" + bytesToHex(result));
		send("doFinal结果(Base64):" + bytesToBase64(result));
		return result;
    }
	mac.doFinal.overload('[B').implementation = function (a) {
        send("======================================");
		showStacks();
		var result = this.doFinal(a);
		send("doFinal参数(String):" + bytesToString(a));
		send("doFinal结果(Hex):" + bytesToHex(result));
		send("doFinal结果(Base64):" + bytesToBase64(result));
		return result;
    }
});