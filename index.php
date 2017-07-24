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
                                <button type="button" class="btn btn-success"> Checkout
                                    <span class="glyphicon glyphicon-play"></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

<?php
include('includes/shopping-cart-template.html');
include('includes/product-template.html');
include('includes/footer.html');
?>