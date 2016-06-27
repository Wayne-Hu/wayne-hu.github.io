---
layout: post
title: Angular -- 表单的验证
description: Angular最重要的内置指令之一 ngModel，以及NgModelController。本文将尝试自定义validations。
category: Web
tags: [Angular, Directive, Form, ngModel, validation]
---

上篇介绍了ngModel的一些基本概念，以及如何使用NgModelController提供的API来完成小写变大写。本文将介绍另外一个重要的概念，那就是validation。Form的开发最为重要的就是向服务端POST数据，在POST之前，我们需要验证数据的正确性，这些验证可以是一些基础的验证，例如验证是否是全数字，也可以是调用API来验证，例如验证用户输入的用户名是否已经被占用了。要完成这些验证，就离不开另外几个属性。

> **$validators** 保存一组validators的key-value集合，当model value被改变的时候调用。key作为validator的方法名，value是一个方法，其参数为modelValue和viewValue。
> **$asyncValidators** 异步验证，返回一个Promise对象，当成功时返回true，失败时返回false。所有的validators会并发执行，modelValue会在所有的validators都执行完成以后**改变一次**。未完成的validators会存放在pending中。
> **$validate()** 执行所有的已注册的validators，执行顺序为同步->异步。如果验证结果为无效，则model会被设置为undefined，除非`ngModelOptions.allowInvalid`已经被设置为true。如果验证结果为有效，那么model会被设置为上次有效的modelValue。通常情况下，我们无须自己调用该方法。

下面我们实现一个简单的validator去验证输入是否为数字。

```html
<form name="form">
	<label for="test">{{form.numberOnly.$error}}</label>
	<input id="test" name="numberOnly" ng-model="model.value" type="text" hf-number-only>
   
</form>
```

```JavaScript
app.directive('hfNumberOnly', ['$log', function($log) {
    return {
      priority: 1,
      require: 'ngModel',
      link: function(scope, ele, attrs, ctrl) {
        ctrl.$validators.numberOnly = function(modelValue, viewValue) {
          var regExp = /^^\-?\d+$/;
          if (!viewValue) return true;
          
          if (regExp.test(viewValue)) {
            return true;
          }
          
          return false;
        };
      }
    };
  }]);
```

就这么简单，当每次在输入框输入时，validator就会自动被调用，当方法返回false时，label的html就变成了`{"numberOnly":true}`。

