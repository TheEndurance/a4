<?php
include('includes/header.html');

if ($_SERVER['REQUEST_METHOD']=='POST'){ // POST
    $shoppingcart = json_decode($_POST['json'],true);
    $grandTotal = $_POST['grand-total'];
    $name = $_POST['name'];
    $postalCode = $_POST['postal-code'];
    $address = $_POST['address'];
    $phone = $_POST['phone-number'];
    $city = $_POST['city'];
    $province = $_POST['province']
?>
    <div class="container">
        <div class="alert alert-dismissible alert-success">
            <button type="button" class="close" data-dismiss="alert">×</button>
            <strong>Order successful!</strong> View your order receipt below.
        </div>
        <div class="well col-sm-10 col-md-10 col-sm-offset-1 col-md-offset-1">
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6">
                    <address>
                        <h4>Shipping Address:</h4>
                        <strong><?php echo $name ;?></strong><br>
                        <?php echo $address; ?><br>
                        <?php echo $city . ', ' . $postalCode; ?><br>
                        <?php echo $province;?><br>
                        <span class="glyphicon glyphicon-phone"></span> <?php echo $phone ?>
                    </address>
                </div>
            </div>
            <div class="row">
                <div class="text-center">
                    <h1>Receipt</h1>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12 col-md-12">
                    <table id="receipt" class="table table-hover">
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
        <?php
        foreach($shoppingcart as $item){
        ?>
                        <tr>
                            <td class="col-sm-6 col-md-6">
                                <div class="media">
                                    <a class="thumbnail pull-left" href="#"> <img class="media-object" src="<?php echo $item['product']['image'] ;?>" style="width: 72px; height: 72px;"> </a>
                                    <div class="media-body">
                                        <h4 class="media-heading"><a href="#"><?php echo $item['product']['name'] ;?></a></h4>
                                        <span>Status: </span><span class="text-success"><strong>In Stock</strong></span>
                                    </div>
                                </div>
                            </td>
                            <td class="col-sm-3 col-md-3" style="text-align: center"><?php echo $item['quantity'];?> </td>
                            <td class="col-sm-1 col-md-1 text-center"><strong>$<?php echo $item['product']['price'] ;?></strong></td>
                            <td class="col-sm-1 col-md-1 text-center"><strong>$<?php echo ($item['product']['price'] * $item['quantity']) ;?></strong></td>
                        </tr>
        <?php
        } // END For each
        ?>
                        <tr>
                            <td  class="col-sm-6 col-md-6"></td>
                            <td class="col-sm-3 col-md-3"></td>
                            <td class="col-sm-1 col-md-1">
                                <h3>Total</h3>
                            </td>
                            <td class="col-sm-1 col-md-1">
                                <h3 id="grand-total"><strong>$<?php echo $grandTotal;?></strong></h3>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
<?php
} // END POST

include('includes/footer.html');
?>