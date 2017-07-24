<?php
include('includes/header.html');
?>
    <div class="container">
        <div class="row" id="productsRow">

        </div>
        <hr>
        <div class="row" id="shoppingCartRow">
            <div class="col-sm-12 col-md-12">
                <table id="shoppingCart" class="table table-responsive">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th class="text-center">Price</th>
                            <th class="text-center">Total</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <h3>Total</h3>
                            </td>
                            <td class="text-right">
                                <h3 id="grand-total"><strong>$0.00</strong></h3>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <button type="button" class="btn btn-default">
                                    <span class="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                                </button>
                            </td>
                            <td>
                                <button type="button" class="btn btn-success" data-toggle="collapse" data-target="#checkout"> Checkout
                                    <span class="glyphicon glyphicon-play"></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <hr>
        <div id="checkout" class="well bs-component collapse">
            <form id="freelance-form" class="form-horizontal" action "#" method="POST">
                <fieldset id="mandatory">
                    <legend>Checkout</legend>
                    <div class="form-group">
                        <label for="name" class="col-lg-2 control-label">Name</label>
                        <div class="col-lg-10">
                            <input type="text" class="form-control" id="name">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="address" class="col-lg-2 control-label">Address</label>
                        <div class="col-lg-10">
                            <input type="text" class="form-control" id="address" placeholder="eg. 123 Address Street">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="postal-code" class="col-lg-2 control-label">Postal Code</label>
                        <div class="col-lg-10">
                            <input type="text" class="form-control" id="postal-code" placeholder="eg. N2L 5K3">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="city" class="col-lg-2 control-label">City</label>
                        <div class="col-lg-10">
                            <input type="text" class="form-control" id="city">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="phone-number" class="col-lg-2 control-label">Phone</label>
                        <div class="col-lg-10">
                            <input type="text" class="form-control" id="phone-number" placeholder="eg (999)999-9999">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="province" class="col-lg-2 control-label">Province</label>
                        <div class="col-lg-10">
                            <select type="select" class="form-control" id="province">
                                <option value="">Select Province</option>
                                <option>Ontario</option>
                                <option>British Columbia</option>
                                <option>Alberta</option>
                                <option>Saskatchewan</option>
                                <option>Manitobia</option>
                                <option>Quebec</option>
                                <option>Newfoundland and Labrador</option>
                                <option>Nova Scotia</option>
                                <option>New Brunswick</option>
                                <option>Prince Edward Island</option>
                                <option>Nunuvat</option>
                                <option>Northwest Territories</option>
                                <option>Yukon</option>
                            </select>
                        </div>
                    </div>
                </fieldset>
                <div class="form-group">
                    <div class="col-lg-10 col-lg-offset-2">
                        <button type="reset" class="btn btn-default" data-toggle="collapse" data-target="#checkout">Cancel</button>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>

<?php
include('includes/shopping-cart-template.html');
include('includes/product-template.html');
include('includes/footer.html');
?>