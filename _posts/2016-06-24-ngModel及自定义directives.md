---
layout: post
title: Angular -- ngModel
description: Angular最重要的内置指令之一 ngModel，以及NgModelController。本文重点分析该指令及NgModelController，并且会着重介绍NgModelController的几个属性，方法，已经如何在我们的自定义指令中使用这些元素。
category: Web
tags: [Angular, Directive, Form, ngModel]
---

# ngModel
在AngularJS中，当我们使用Form来创建表单的时候，使用最多的一个directive无疑就是**ngModel**了。事实上AngularJS重写了很多基本的Form元素，例如form，input，input[text]等等，从而让我们可以很轻松的完成一些有趣的工作，或者很方便的对输入的元素进行验证。

咱们不妨先看AngularJS对ngModel的描述：

> The ngModel directive binds an input, select, textarea (or custom form control) to a property on the scope using **NgModelController**, which is created and exposed by this directive.

ngModel指令首先会创建和暴露出来一个**NgModelController**，使用NgModelController将input，select，textarea（或者自定义表单控件）绑定到scope上的一个属性。描述总是苍白的，我们不如看一下源码是如何定义的：

```javascript
var ngModelDirective = ['$rootScope', function($rootScope) {
	return {
		restrict: 'A',
		require: ['ngModel', '^?form', '^?ngModelOptions'],
		controller: NgModelController,
		priority: 1,
		compile: function ngModelCompile(element) {
			//preLink and postLink functions
		}
	}
}];
```
由代码可以看到，ngModel首先是一个*A*元素，其次它可以搭配的父元素有form和ngModelOptions，另外就是声明了NgModelController。但是ngModel都有哪些具体的职责呢？

> `ngModel` is responsible for:
>
> * Binding the view into the model, which other directives such as `input`, `textarea` or `select` require.
> * Providing **validation** behavior (i.e. required, number, email, url).
> * Keeping the state of the control (valid/invalid, dirty/pristine, touched/untouched, validation errors).
> * Setting related css classes on the element (`ng-valid`, `ng-invalid`, `ng-dirty`, `ng-pristine`, `ng-touched`, `ng-untouched`, `ng-empty`, `ng-not-empty`) including animations.
> * Registering the control with its parent [form](https://docs.angularjs.org/api/ng/directive/form).
> 
> Note: `ngModel` will try to bind to the property given by evaluating the expression on the current scope. If the property doesn't already exist on this scope, it will be created implicitly and added to the scope.

以上内容都是AngularJS定义好的，我们只需要知道怎么使用就可以了，比如使用一些常见的validation (maxlength, minlength, required)等等。除了这些基本的操作外，我们如何使用ngModel来做其它的事情？比如自定义validation，比如将输入小写字母转换成大写字母。这就要涉及到自定义directive，以及要用到强大的武器**NgModelController**了。

## NgModelController

> NgModelController **provides API** for the ngModel directive. The controller contains services for data-binding, **validation**, CSS updates, and **value formatting and parsing**. It purposefully does not contain any logic which deals with DOM rendering or listening to DOM events. Such DOM related logic should be provided by other directives which make use of NgModelController for data-binding to control elements. 

NgModelController给ngModel提供了API。它包含的服务包含数据绑定，验证，CSS更新以及数据格式化和解析。它估计不包含任何与处理DOM展示和监听DOM事件的逻辑，此类逻辑应该由使用NgModelController其它directives来实现。所以我们需要使用NgModelController来实现我们想要的逻辑，例如大小写变换。

在实现之前，我们先看NgModelController里的几个相关定义。

> * $viewValue: 视图数据。从视图上获取到的真实value，对于`input`元素来说，就是String。
> * $modelValue: 模型数据。控制器所绑定的model的值。
> * $parsers: 一个执行函数数组，它执行起来类似管道，上一个处理的结果会发送到数组的下一个函数当中。当视图数据变化的时候（例如在`input`中输入了字母）执行。Parsers**用于将视图数据解析到模型数据**。返回值为`undefined`意味着解析错误，那么所有的validators都不会执行并且ngModel的值会被设置为`undefined`，除非将`ngModelOptions.allowInvalid`设置为`true`。
> * $formatters: 和parsers类似，但是是按照函数插入的**相反顺序**执行，最后一个返回结果最为最终的DOM值。**用于将模型数据格式化到视图**。

我们要实现小写转大写的功能就需要使用到这几个属性。具体代码如下：

```html
<div ng-controller="FormCtrl as model">
<form name="form">
	<label for="test">{{model.value}}</label>
	<input id="test" name="captalize" hf-captalize ng-model="model.value" type="text">
	
	<button type="button" ng-click="model.value = 'change'">change</button>
</form>
</div>
```

```JavaScript
var app = angular.module('app', []);

app.controller('FormCtrl', ['$log', '$scope', function($log, $scope) {
    var self = this;
    this.value = 'test';
    
    $scope.$watch('model.value', function() {
      $log.debug('Watched value: ' + self.value);
    });
  }]);
  
app.directive('hfCaptalize', ['$log', function($log) {
    return {
      priority: 99,
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl) {
        function captalize(value) {
          $log.debug('captalize Called: ' + value);
          
          $log.debug('view value: ' + ctrl.$viewValue);
          $log.debug('model value: ' + ctrl.$modelValue);
          
          if (typeof value !== 'string') {
            return value;
          }
          
          var upper = value.toUpperCase();
          ctrl.$setViewValue(upper); // 将改变后的值赋给$viewValue
          ctrl.$render(); // 更新view
          return upper;
        }
        
        // 当在输入框中输入时，就会调用parsers里的方法，而当使用button改变模型数据的时候，并不触发parsers里的方法。
        ctrl.$parsers.push(captalize);
        // 当通过其它方式改变模型数据时，例如button被按下时，就会调用$formatters里的方法
        ctrl.$formatters.push(captalize);
//         captalize(scope.$eval(attrs.ngModel));
      }
    };
  }]);
```

初始化运行结果如下图:

![angular-ng-model-captalize-init](http://7xvog5.com1.z0.glb.clouddn.com/angular-ng-model-captalize-init.png)

第一个view value为何为NaN呢？这是因为，在我们初始化的时候，是通过代码将赋值给了model的，那么视图数据此时是没有值的。

当我们点击change按钮了以后（下图），ng-click里面的表达式被调用，此时就会将模型值设置为'change'，然后依插入顺序调用parsers里的方法，所以view value是为改变之前的模型数据TEST，而模型数据此时已经改变了。
下图中的第二个view value为何是'CHANGE'，而model value是'change'呢？因为在captalize方法中，我们调用了`ctrl.$setViewValue()`和`ctrl.$render()`，此时将会改变视图数据，而模型数据还未改变。

![angular-ng-model-captalize-change](http://7xvog5.com1.z0.glb.clouddn.com/angular-ng-model-captalize-change.png)

也可以尝试在输入框中自行输入一些字母来查看效果哦。我在jsbin里面已经创建了一个例子程序，可以[点击](http://jsbin.com/faguha/123)尝试。


